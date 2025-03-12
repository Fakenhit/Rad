


const KeyPlay = document.getElementById("playstop");
const audioPlayer =  document.getElementById("audioPlayer");
const PlayerController = document.getElementById("playerControler");
const playerControlerName = document.getElementById("controllerName");
const timePicker = document.getElementById("timePicker");

audioPlayer.addEventListener('timeupdate', function () {
    timePicker.innerHTML = secondsToTime(audioPlayer.currentTime);
}, false);

function PlayStop() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        KeyPlay.src = "images/pause.svg";

        
    } else {
        audioPlayer.pause();
        KeyPlay.src = "images/Play.svg";
    }
}

function Bit(src, name) {
    console.log("Клик по поесни");
    console.log(`Ссылка на песню: ${src}`);
    
    if (!decodeURIComponent(audioPlayer.src.split('?')[0].split('#')[0]).endsWith(src)) {
        audioPlayer.src = src;
        playerControlerName.innerText = name; 
    }
    PlayStop();

    PlayerController.classList.remove("d-none");

}


KeyPlay.addEventListener("click", function() {
    PlayStop();
});

function removeClassFromAll() {
    // Выбираем все элементы с классом "example"
    const elements = document.querySelectorAll('.active');
  
    // Проходимся по каждому элементу и удаляем класс
    elements.forEach(element => {
      element.classList.remove('active'); // Удаляем класс
    });
  }


function list(radio) {
    const music = document.getElementById("music");
    while(music.firstChild){
        music.removeChild(music.firstChild);
    }
    for (let mk of radio) {
        let div = document.createElement('div');
        div.className = "row mt-1";
        div.addEventListener("click", function() {
            Bit(mk.src, mk.audioName);
            removeClassFromAll();
            div.classList.add("active");
        });
        div.innerHTML = `<div class="col-12 composition hov hover mx-5"><a>${mk.audioName}</div>`;
        
        let music = document.getElementById('music');
        music.append(div);
    }
}

list(West_Coast_Classics);

audioPlayer.addEventListener('loadedmetadata', function() {
    const duration = audioPlayer.duration; // Длительность в секундах
    const formattedDuration = formatTime(duration); // Форматируем время
    document.getElementById('duration').textContent = formattedDuration;
});

// Функция для преобразования секунд в минуты и секунды
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); // Получаем минуты
    const secs = Math.floor(seconds % 60); // Получаем секунды
    // Добавляем ведущий ноль, если секунд меньше 10
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}


function secondsToTime(time){
             
    var h = Math.floor(time / (60 * 60)),
        dm = time % (60 * 60),
        m = Math.floor(dm / 60),
        ds = dm % 60,
        s = Math.ceil(ds);
    if (s === 60) {
        s = 0;
        m = m + 1;
    }
    if (s < 10) {
        s = '0' + s;
    }
    if (m === 60) {
        m = 0;
        h = h + 1;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (h === 0) {
        fulltime = m + ':' + s;
    } else {
        fulltime = h + ':' + m + ':' + s;
    }
    return fulltime;
}



