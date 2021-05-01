const musicContainer = document.querySelector('.music-container');
const playButton = document.querySelector('#play');
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');
const progress = document.querySelector('.progress')
const audio = document.querySelector('#audio');
const progressContainer = document.querySelector('.progress-bar');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const cover = document.querySelector('#cover');
const duration = document.querySelector('#song-duration')
const currentDuration = document.querySelector('.current-position');

const songs = ['Honey Honey', 'Peaches', 'Blinding Lights', 'Kaam 25', 'Galactic Symphony', 'Boht Tej']
const artists = ['Mandragora', 'Justin Bieber', 'The Weeknd', 'Divine', 'Mandragora', 'Fotty Seven feat. Badshah'];


let songIndex = 0;

playTrack(songs[songIndex]);

function playTrack(song){
    title.innerText = song;
    audio.src =`music/${song}.mp3`
    cover.src = `images/${song}.png`
    artist.innerText = artists[songIndex];
}

function playSong() {
    audio.classList.add('is-active');
    playButton.querySelector('.fas').classList.remove('fa-play');
    playButton.querySelector('.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    audio.classList.remove('is-active');
    playButton.querySelector('.fas').classList.add('fa-play');
    playButton.querySelector('.fas').classList.remove('fa-pause');
    audio.pause();
}

function prevSong(){
    songIndex--;

    if(songIndex < 0 ){
        songIndex = songs.length - 1;
    }

    playTrack(songs[songIndex])
    playSong()
}

function nextSong(){
    songIndex++;

    if(songIndex > (songs.length-1)){
        songIndex = 0;
    }

    playTrack(songs[songIndex])
    playSong()
}


function updateDuration(e){
    var durationDetails = Math.ceil(e.srcElement.duration);
    var minutes = durationDetails/60;
    var seconds = durationDetails%60;

    if(seconds<10){
        duration.innerText = `${Math.floor(minutes)}:0${seconds}`
    } else {
        duration.innerText = `${Math.floor(minutes)}:${seconds}`
    }
    
}


function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`
}


function updateCurrentTime(e){
    const {currentTime} = e.srcElement;
    var totalSeconds = Math.floor(currentTime)
    var minutes = totalSeconds/60;
    var seconds = totalSeconds%60;

    if(seconds<10){
        currentDuration.innerText = `${Math.floor(minutes)}:0${seconds}`
    } else {
        currentDuration.innerText = `${Math.floor(minutes)}:${seconds}`
    }
    
}

function setProgress(e){
    const width = this.clientWidth;
    const clickPosition = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickPosition/width) * duration;
}


playButton.addEventListener('click', () => {
    const active = audio.classList.contains('is-active')

    if(active){
        pauseSong()
    } else{
        playSong()
    }
});

prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

audio.addEventListener('canplay', updateDuration);
audio.addEventListener('timeupdate', updateCurrentTime);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setProgress)



