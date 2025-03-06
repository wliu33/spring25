function addOneToCounter(){
    let counterElem = document.getElementById("counter");
    let totalCount = parseInt(document.getElementById("counter").innerText) + 1;
    counterElem.innerText = totalCount;
    let currentCookie;

    //munch sound
    let audio = document.getElementById("crunch-sound");
    audio.play();

    currentCookie = document.getElementById("oreo.img");
    //change the image on even clicks only
    if (totalCount % 2 === 0) {
        currentCookie.src = "bitten_cookie.jpg";  
    } else {
        currentCookie.src = "full_oreo.png";  
    }
    currentCookie.style.width = "40%";
    currentCookie.style.height = "40%";
    currentCookie.style.alignSelf = "center";
   
    
}