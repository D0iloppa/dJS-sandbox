let hashId = -1;

document.addEventListener("DOMContentLoaded", async () => {
    // document ready;

    
    const appendTarget = ".picasso";

    if(!getFingerPrint()) {
      await genFingerPrint();
      $(appendTarget).text("클라이언트의 fingerprint가 존재하지 않습니다. 새로운 fingerprint 발행합니다.");
      $(appendTarget).append("<br><br>");
    }
      
  
    const fingerPrint = getFingerPrint();
    const hashPrint = `<b>visitor's fingerPrint hashValue</b> : ${fingerPrint.hashId}`;
    hashId = fingerPrint.hashId;
    
    $(appendTarget).append();
    $(appendTarget).append(`<span>${hashPrint}</span>`);
    $(appendTarget).append("<br><br>");
  
    const img = document.createElement('img');
    img.style["width"] = "300px";
    img.src = getCanvas(fingerPrint.seed).img;
  
  $(appendTarget).append(img);
    
  });