// This is a proof of concept of a scrollable chat messages container.

/* DOM references */
const messagesNode = document.querySelector(".messages");

const loadingNode = document.createElement("p");
loadingNode.classList.add("textMessage", "loading");
loadingNode.innerHTML = `Loading...`;
const LOADING_NODE_HEIGHT = 42;

const observerTargetNode = document.createElement("div");

// Counter for mock message IDs. Decremented since messages
// are rendered in reverse chronological order
let messageID;
//let messageID = 1000;

/* Utilities */
function getRandomImageID() {
  return Math.floor(Math.random() * (10 - 1)) + 1;
}

const HEIGHTS = [50, 100, 150];
function getRandomImageHeight() {
  return HEIGHTS[Math.floor(Math.random() * HEIGHTS.length)];
}

function addNodeToParent(node, parent) {
  // node가 없으면 아무 작업을 하지 않는다
  if(!node) return;

  /**
   * Nodes are inserted in different orders so that the
   * resultant UIs between `column` and `column-reversed`
   * are the same.
   *
   * If you're using a framework like React, you can simply
   * `.reverse()` on your list of message components and
   * trust the framework to commit the DOM updates.
   */
  if (window.CSS.supports("overflow-anchor: auto")) {
    parent.prepend(node);
  } else {
    parent.append(node);
  }
}



function scrollToBottom() {
  messagesNode.scrollTop = messagesNode.scrollHeight;
}

function getAnchorMessageNode() {
  /**
   * We always want to anchor against the topmost message,
   * which would be either the first message or the last,
   * depending on your layout method.
   */
  if (window.CSS.supports("overflow-anchor: auto")) {
    return messagesNode.firstChild;
  } else {
    return messagesNode.lastChild;
  }
}

async function addMessages() {
  messagesNode.removeChild(observerTargetNode);
  const prevTopElement = getAnchorMessageNode();
  addNodeToParent(loadingNode, messagesNode);

  const fragment = await getNewMessageNodes();
  addNodeToParent(fragment, messagesNode);

  // Scroll in one frame, then re-insert the observer target
  // in the next
  if(fragment)
  requestAnimationFrame(() => {
    messagesNode.scrollTop =
      prevTopElement.offsetTop - messagesNode.offsetTop - LOADING_NODE_HEIGHT;
    requestAnimationFrame(() => {
      messagesNode.removeChild(loadingNode);
      if(messagesNode)
        addNodeToParent(observerTargetNode, messagesNode);
    });
  });
  // 아무 작업이 할 일이 없는 경우 loading만 삭제
  else messagesNode.removeChild(loadingNode);

}

function observerCallback(observerEntries) {
  if (observerEntries[0].isIntersecting) {
    addMessages();
  }
} 

/* Observer for loading new messages */
let observer = new IntersectionObserver(observerCallback, {
  root: document.querySelector(".messagesNode"),
  rootMargin: "0px",
  threshold: 1.0
});
observer.observe(observerTargetNode);

/* Rendering logic */
async function initialRender() {
  const fragment = await getNewMessageNodes();
  addNodeToParent(fragment, messagesNode);

  // Scroll in one frame, then re-insert the observer target
  // in the next
  requestAnimationFrame(() => {
    scrollToBottom();
    requestAnimationFrame(() => {
      if(messagesNode)
      addNodeToParent(observerTargetNode, messagesNode);
    });
  });
}

let msgList = [];

function messageDataLoad(){
  // 메시지 데이터 리스트 로딩
  msgList = [
    {user_id : "doil"  , msg : "안녕하세요" },
    {user_id : "doil2" , msg : "안녕하세요2" },
    {user_id : "doil"  , msg : "메시지 테스트" },
    {user_id : "doil"  , msg : "아무말" },
    {user_id : "doil"  , msg : "요소확인" },
    {user_id : "doil"  , msg : "아아아아아" },
    {user_id : "doil"  , msg : "뽀미귀여워" },
    {user_id : "doil"  , msg : "희망이도 귀여움" },
    {user_id : "doil"  , msg : "안녕하세요" },
    {user_id : "doil2" , msg : "안녕하세요2" },
    {user_id : "doil"  , msg : "메시지 테스트" },
    {user_id : "doil"  , msg : "아무말" },
    {user_id : "doil"  , msg : "요소확인" },
    {user_id : "doil"  , msg : "아아아아아" },
    {user_id : "doil"  , msg : "뽀미귀여워" },
    {user_id : "doil"  , msg : "희망이도 귀여움" },
    {user_id : "doil"  , msg : "안녕하세요" },
    {user_id : "doil2" , msg : "안녕하세요2" },
    {user_id : "doil"  , msg : "메시지 테스트" },
    {user_id : "doil"  , msg : "아무말" },
    {user_id : "doil"  , msg : "요소확인" },
    {user_id : "doil"  , msg : "아아아아아" },
    {user_id : "doil"  , msg : "뽀미귀여워" },
    {user_id : "doil"  , msg : "희망이도 귀여움" },
    {user_id : "doil"  , msg : "안녕하세요" },
    {user_id : "doil2" , msg : "안녕하세요2" },
    {user_id : "doil"  , msg : "메시지 테스트" },
    {user_id : "doil"  , msg : "아무말" },
    {user_id : "doil"  , msg : "요소확인" },
    {user_id : "doil"  , msg : "아아아아아" },
    {user_id : "doil"  , msg : "뽀미귀여워" },
    {user_id : "doil"  , msg : "희망이도 귀여움" },
  ];

  // 메시지가 비어 있는 경우 확인
  // msgList = [];

  // 메시지 커서 id (역순, total count)
  messageID = msgList.length - 1;
}



// 한 스크롤에 찍힐 fragment 생성
async function getNewMessageNodes() {

  const fragment = document.createDocumentFragment();
  /*
  for (let i = 0; i < 9; i++) {
    const text = createTextMessageNode();
    addNodeToParent(text, fragment);
  }
  const image = await createImageMessageNode();
  addNodeToParent(image, fragment);
  */

  // 데이터 값
  let successCnt = 0;
  for(let i=0; i<fragmentOffset ; i++){
    const msgData = msgList[messageID];

    // 메시지 아이템 생성
    const item = createMessageNode(msgData);
    // 아이템이 존재하는 경우 프래그먼트에 아이템 추가
    if(item) {
      addNodeToParent(item, fragment);
      successCnt++
    }
  }

  // 하나라도 성공한 경우에만 return
  if(successCnt > 0) return fragment;

}

// 메시지 데이터 노드 엘리먼트 생성
function createMessageNode(data){
  console.log(data);
  if(!data) return false;


  const item = $("<li class='row textMessage' />")
                .text(`#${messageID} msg : ${data.msg} [name:${data.user_id}] | ${new Date()}`);

  messageID--;

  // [ 이미지 로딩 ]
    /**
     * We preload the images and only resolve the promise once
     * the nodes are fully loaoded.
     *
     * If you're using a framework like React, your ability
     * to manipulate the DOM is limited. Instead of resolving
     * the promise with the actual img node, you can resolve
     * it with `image.width` and `image.height` instead.
     * Use these values to precompute aspect ratios
     * for image placeholders.
     */

  /*
    return new Promise((resolve, reject) => {
    const image = document.createElement("img");
    image.classList.add("imageMessage");
    image.src = `https://picsum.photos/id/${getRandomImageID()}/100/${getRandomImageHeight()}`;

    image.onload = () => {
      messageID -= 1;
      resolve(image);
    };
  });
  */

  return item[0]; // 제이쿼리로 생성한 실제 html element를 리턴해줘야 한다.
}



// 한 프래그먼트에 들어가는 아이템의 수(max)
const fragmentOffset = 5;

// document ready
$(function(){
  console.log("dcmt ready");

  messageDataLoad();

  initialRender();

});

