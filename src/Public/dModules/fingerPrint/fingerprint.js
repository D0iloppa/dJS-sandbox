///////////////////////////

const cookie_key = "fingerPrint";

document.addEventListener("DOMContentLoaded", async () => {
  // document ready;

  if(!getFingerPrint()) {
    await genFingerPrint();
    $(".picasso .content").text("클라이언트의 fingerprint가 존재하지 않습니다. 새로운 fingerprint 발행합니다.");
    $(".picasso .content").append("<br><br>");
  }
    

  const fingerPrint = getFingerPrint();
  const hashPrint = `<b>visitor's fingerPrint hashValue</b> : ${fingerPrint.hashId}`;

  $(".picasso .content").append(`<span>${hashPrint}</span>`);
  $(".picasso .content").append("<br><br>");

  const img = document.createElement('img');
  img.style["width"] = "300px";
  img.src = getCanvas(fingerPrint.seed).img;

$(".picasso .content").append(img);
  
});
///////////////////////////
// [picasso pinger print algo]

/**
 * 쿠키값 조회
 * @returns 
 */
function getFingerPrint() {
  var cookie_list = document.cookie.split("; ");

  // 아직 쿠키가 설정되지 않은 경우 null 리턴
  if (!cookie_list[0]) return null;

  // 쿠키에서 가져온 결과 값
  var result = null;

  // 쿠키 내에서 fingerPrint key 값으로 저장된 값을 찾기위한 배열

  let findValue = cookie_list.find( i => (i.split("=")[0] == cookie_key) );
  if(findValue){
    findValue = decodeURI(findValue.substring(findValue.indexOf("=") + 1));
    result = JSON.parse(findValue) || null;
  }


  return result;
}

/**
 * 지문 쿠키생성
 * @param {*} cookie_info 
 */
function genFingerPrint() {
  // 쿠키에 fingerPrint 존재여부 확인
  const fingerPrintChk = getFingerPrint();
  if(fingerPrintChk){
    console.log("exsist",fingerPrintChk);
    return;
  }

  // 쿠키를 저장할 도메인 명
const now_hostname = window.location.hostname;

const initialSeed = Math.floor(99999 * Math.random());

// 지문 생성
const fingerPrint = getCanvas(initialSeed);
const {hashId,seed} = fingerPrint;

// const result = { hashId : fingerPrint.hashId , seed : fingerPrint.seed};
const result = { hashId , seed } ;


console.log(fingerPrint , result);
  // 생성된 지문 쿠키에 저장
  let date = new Date(); 
  // 30 min 이후에 expire
  date.setTime(date.getTime() + (1000 * 60 * 30));
  const expires = "; expires=" + date.toGMTString();


  document.cookie = cookie_key+"=" + encodeURI(JSON.stringify(result)) + "; path=/; domain=" + now_hostname + expires;
}

/**
 * 지문쿠키 소멸
 */
function expireFingerPrint() {
  let cookie_info = {};
  let now_hostname = window.location.hostname;

  document.cookie = cookie_key+"=" + encodeURI(JSON.stringify(cookie_info[cookie_key])) + "; path=/; domain=" + now_hostname + "; max-age=0";
}

// 요청한 seed값의 canvas 계산
function getCanvas(seed){

  if(!seed) return false;

  // fingerprint canvas setting params
  const params = {
    area: {
        width: 1000,
        height: 1000,
    },
    offsetParameter: 2001000001,
    fontSizeFactor: 1.5,
    multiplier: 15000,
    maxShadowBlur: 50,
  };

  // Number of shapes to draw. The higher the more costly it is.
  // Can be used as a way to adjust the aggressiveness of the proof of work (POW)
  const numShapes = 100;

  // 지문 생성
  const fingerPrint = picassoCanvas( numShapes, seed, params );

  return fingerPrint;
}


/////////////////////////////////////

/*
* [fingerprintJS opensource]
*    accurate rate : 60%
*/

let detectObj = {};

const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
    .then(FingerprintJS => FingerprintJS.load())

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get())
    .then(result => {
      // This is the visitor identifier:
      const visitorId = result.visitorId
      detectObj.visitorId = visitorId;
      console.log("visitorId : " + visitorId)
      const visitorDiv = document.createElement("div");
      visitorDiv.innerHTML = "visitorId : " + visitorId;
      $(".log").prepend(visitorDiv);
    });

const botdPromise = import('https://openfpcdn.io/botd/v1').then((Botd) => Botd.load());
    // Get detection results when you need them.
    botdPromise
        .then((botd) => { // 수행결과
           const result = botd.detect();
            console.log(result)
            detectObj.detect = result;
            let outstr = `탐지결과 : ${result.botKind} ${result.bot ? "bot":"일반 사용자"}`;
            $(".log").prepend(outstr);

            console.log(botd);

            for(var item in botd){
                const tmp = botd[item];
                if(typeof(tmp) != 'function'){
                    console.log(tmp);
                    const div = document.createElement("div");
                    for(var item2 in tmp){
                        const detail = tmp[item2];
                        const logDiv = document.createElement("div");
                        logDiv.innerHTML = JSON.stringify(detail);
                        div.append(logDiv);
                    }
                    $(".log-content").append(div);
                    $(".log-content").append("<br>");
                }
            }
            
            // $(".log-content").append();
        })
        .catch((error) => console.error(error))

