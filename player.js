



const audioPlayer =  document.getElementById("audioPlayer");
const PlayerController = document.getElementById("playerControler");
const playerControlerName = document.getElementById("controllerName");

function Bit(src, name) {
    console.log("Клик по поесни");
    console.log(`Ссылка на песню: ${src}`);
    
    if (!decodeURIComponent(audioPlayer.src.split('?')[0].split('#')[0]).endsWith(src)) {
        audioPlayer.src = src;
        playerControlerName.innerText = name; 
    }
    
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    PlayerController.classList.remove("d-none");

}



for (let mk of Radio_Los_Santos) {
    let div = document.createElement('div');
    div.className = "row mt-1";
    div.addEventListener("click", function() {
        Bit(mk.src, mk.audioName);
    });
    div.innerHTML = `<div class="col-12 composition mx-5"><a>${mk.audioName}</div>`;
    
    let music = document.getElementById('music');
    music.append(div);
}




