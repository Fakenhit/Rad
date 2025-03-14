


const KeyPlay = document.getElementById("playstop");
const audioPlayer =  document.getElementById("audioPlayer");
const PlayerController = document.getElementById("playerControler");
const playerControlerName = document.getElementById("controllerName");
const timePicker = document.getElementById("timePicker");
const rangeInput = document.getElementById('cowbell');

let Current_album = West_Coast_Classics;
let currentSongIndex = 0;



let isSeeking = false; // Флаг для отслеживания взаимодействия с ползунком

// Обновление времени и ползунка при воспроизведении
audioPlayer.addEventListener('timeupdate', function () {
    if (!isSeeking) { // Обновляем ползунок только если пользователь не взаимодействует с ним
        timePicker.innerHTML = secondsToTime(audioPlayer.currentTime);
        rangeInput.value = audioPlayer.currentTime;
        const value = rangeInput.value;
        const max = rangeInput.max;
        const percent = (value / max) * 100;
        rangeInput.style.setProperty('--fill-percent', `${percent}%`);
    }
}, false);

// Начало взаимодействия с ползунком
rangeInput.addEventListener("mousedown", function () {
    isSeeking = true; // Устанавливаем флаг в true
});

// Завершение взаимодействия с ползунком
rangeInput.addEventListener("mouseup", function () {
    isSeeking = false; // Сбрасываем флаг
    audioPlayer.currentTime = rangeInput.value; // Устанавливаем текущее время аудио
});

// Перемотка при изменении ползунка (опционально)
rangeInput.addEventListener("input", function () {
    audioPlayer.currentTime = rangeInput.value;
});

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
    Current_album = radio;
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

list(Current_album); // Стандартный Вызов первого Альбома

audioPlayer.addEventListener('loadedmetadata', function() {
    rangeInput.max = audioPlayer.duration;
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





rangeInput.addEventListener('input', () => {
    const value = rangeInput.value;
    const max = rangeInput.max;
    const percent = (value / max) * 100;
    rangeInput.style.setProperty('--fill-percent', `${percent}%`);
});

// Инициализация при загрузке страницы
const initialValue = rangeInput.value;
const max = rangeInput.max;
const initialPercent = (initialValue / max) * 100;
rangeInput.style.setProperty('--fill-percent', `${initialPercent}%`);



// function nextSong() {
//     currentSongIndex = (currentSongIndex + 1) % Current_album.length;
//     if (currentSongIndex >= 0 && currentSongIndex < Current_album.length) {
//         Bit(Current_album[currentSongIndex].src, Current_album[currentSongIndex].audioName);

//         Current_album[currentSongIndex].src;
//     }
//     // playSong(currentSongIndex);
// }
// // Автоматическое переключение на следующую песню после окончания текущей
// audioPlayer.addEventListener('ended', nextSong);



