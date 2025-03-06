//must be kept static
let clicks = 0;
let cps = 0;
let ms = 0;
let started = false;
setInterval(() => {
    if(started) {
        ms+=10; //add 10 millisec
        //calculate the cps
        cps = Math.round(clicks / (ms/1000));
        //call update to update cps on the screen
        update();
    }
}, 10)

function addOneToCounter(){
    let counterElem = document.getElementById("counter");
    let totalCount = parseInt(document.getElementById("counter").innerText) + 1;
    counterElem.innerText = totalCount;
    let currentCookie;
    //initialize cps to 0 until user made first click

    //munch sound
    let audio = document.getElementById("crunch-sound");
    audio.play();

    clicks++;
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
   
    //starts time only once (if haven't clicked yet)
    if (!started) {
        started = true;      
    }
        
}

function update() {
    document.getElementById("cps").innerText = "Clicks per Second: " + cps;
}