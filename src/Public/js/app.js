// 서버로 연결하는 socket
const socket = new WebSocket(`ws://${window.location.host}`);



socket.addEventListener("open" , ()=>{
    console.log("Wellcome! Connected to Server ✅");
});

socket.addEventListener("message", (msg)=>{
    console.log("Just got this : ", msg.data , " from server");
    
    const html = `<div style="float:left">서버 : ${msg.data} </div><br>`;
    $("#chatArea").append(html);
});

socket.addEventListener("close", ()=>{
    console.log("Bye! Disconnected from Server ❌");
});

function sendMsgToServer(msg){
    socket.send(msg);
}

function sendBtn(){
    const msg = $("#inputBox").val();
    if(!msg) return;

    const html = `<div style="float:right">나 : ${msg}</div><br>`;
    $("#chatArea").append(html);
    sendMsgToServer(msg);
    // 클리어
    $("#inputBox").val('');
}
 