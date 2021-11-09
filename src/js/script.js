import "../css/owfont-regular.css"
import "../css/style.css"
import arrayOfSounds from "./playList"

// time and date block..........................................................................................


function showTime() {
  let date = new Date();
  const time = document.querySelector('.time');
  const currentTime = date.toLocaleTimeString();
  time.textContent = `${currentTime}`;

  
  showDate(date);
  setTimeout(showTime,1000);
}
showTime();




function showDate(dateArg){
  const options = {weekday:"long", month: 'long', day: 'numeric'};
  const currentDate = dateArg.toLocaleDateString('en-US', options);
  document.querySelector(".date").textContent=`${currentDate}`;
}



// greeting....................................................................................................

function getGreeting() {
  const greeting=document.querySelector(".greeting");
  const timeOfDay = getTimeOfDay();
  greeting.innerText = `Good ${timeOfDay}`;
} 
getGreeting();

function getTimeOfDay(){
  let date = new Date();
  const hours = date.getHours();
  if (6<=hours&&hours<12) return "morning,";
  else if (12<=hours&&hours<18) return "afternoon,";
  else if (18<=hours&&hours<24) return "evening,";
  else if (0<=hours&&hours<6) return "night,";
}

let nameInput = document.querySelector(".name");

const userNameKey = 'surname';

function setLocalStorage() {
  localStorage.setItem(userNameKey, nameInput.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  const userName = localStorage.getItem(userNameKey);

  if (userName) {
    nameInput.value = userName;
  }
  nameInput.placeholder = '[Enter name]';
}
window.addEventListener('load', getLocalStorage);



// background.....................................................................

let arrayOfBackgroundImages=[
    'assets/img/1.jpg',
    'assets/img/2.jpg',
    'assets/img/3.jpg',
    'assets/img/4.jpg',
    'assets/img/5.jpg',
    'assets/img/6.jpg',
    'assets/img/7.jpg',
    'assets/img/8.jpg',
    'assets/img/9.jpg',
    'assets/img/10.jpg'];

function getRandomArbitrary(min,max){
  return Math.round(Math.random() * (max - min) + min);
}; 

let imagePos=getRandomArbitrary(0, arrayOfBackgroundImages.length-1);  
document.body.style.backgroundImage = `url(${arrayOfBackgroundImages[imagePos]})`; 

function getSlideNext(){
  if (imagePos==arrayOfBackgroundImages.length-1){
     imagePos=0;
     document.body.style.backgroundImage = `url(${arrayOfBackgroundImages[imagePos]})`;
  }
  else{
    imagePos++;
    document.body.style.backgroundImage = `url(${arrayOfBackgroundImages[imagePos]})`; 
  }
}

function getSlidePrev(){
  if (imagePos==0){
     imagePos=arrayOfBackgroundImages.length-1;
     document.body.style.backgroundImage = `url(${arrayOfBackgroundImages[imagePos]})`;
  }
  else{
    imagePos--;
    document.body.style.backgroundImage = `url(${arrayOfBackgroundImages[imagePos]})`; 
  }
}

const buttonPrev=document.querySelector(".slide-prev");
buttonPrev.addEventListener('click', getSlidePrev );

const buttonNext=document.querySelector(".slide-next");
buttonNext.addEventListener('click', getSlideNext );





// phrase block.....................................................................................................

let phrase=document.querySelector(".quote");
let author=document.querySelector(".author");
let arrayOfPhrases=[
  {
    "text": "Success does not consist in never making mistakes but in never making the same one a second time. ",
    "author": "Bernard Show"
  },
  {
    "text": "Simplicity is the ultimate sophistication.",
    "author": "Leonardo da Vinci"
  },
  {
    "text": "Your time is limited, so don’t waste it living someone else’s life.",
    "author": "Steve Jobs"
  },
  {
    "text": "To hell with circumstances; I create opportunities.",
    "author": "Bruce Lee"
  },
  {
    "text": "Every man takes the limits of his own field of vision for the limits of the world.",
    "author": "Arthur Schopenhauer"
  },
  {
    "text": "Progress always involves risks. You can't steal second base and keep your foot on first.",
    "author": "Frederick Wilcox"
  },
  {
    "text": "Begin at once to live and count each separate day as a separate life.",
    "author": "Seneca"
  }
]

function showPhrase(){
    let textPos=getRandomArbitrary(0, arrayOfPhrases.length-1);
    let currentPhrase=arrayOfPhrases[textPos];
    phrase.innerText=`${currentPhrase["text"]}`;
    author.innerText=`${currentPhrase["author"]}`;
}
showPhrase();

let changePhraseButton=document.querySelector(".change-quote");

changePhraseButton.onclick= showPhrase;

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=373b3a006d91488a622ff8c0f98bf0bd&units=metric`;
  const response = await fetch(url);
  const result = await response.json(); 

  weatherIcon.classList.add(`owf-${result.weather[0].id}`);
  temperature.textContent = `${Math.round(result.main.temp)}°C`;
  weatherDescription.textContent = result.weather[0].description;
  wind.textContent = `Wind speed: ${Math.round(result.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${result.main.humidity}%`;
}
getWeather();

city.addEventListener("change",getWeather);



// audio player.......................................................................................................................



const audio = document.querySelector('audio');
const play = document.querySelector('.play');
var isPlay = false;

let currentSound= getRandomArbitrary(0, arrayOfSounds.length-1);
audio.src=arrayOfSounds[currentSound].src;

function usePlay(){
   if(!isPlay){

      audio.currentTime = 0;
      audio.play();
      play.classList.add('pause');
      isPlay = true;
      coloredSounds()
   }
   else{
      audio.pause();
      play.classList.remove('pause');
      isPlay = false;
   }
}

play.onclick=usePlay;

function playNext(){
  if (currentSound==arrayOfSounds.length-1){
     currentSound=0;
     audio.src=arrayOfSounds[currentSound].src;
  }
  else{
    currentSound++;
    audio.src=arrayOfSounds[currentSound].src;
  }
  audio.play();
  play.classList.add('pause');
  isPlay = true;
  coloredSounds();
}

function playPrev(){
  if (currentSound==0){
     currentSound=arrayOfSounds.length-1;
     audio.src=arrayOfSounds[currentSound].src;
  }
  else{
    currentSound--;
    audio.src=arrayOfSounds[currentSound].src; 
  }
  audio.play();
  play.classList.add('pause');
  isPlay = true;
  coloredSounds();
}

const playPrevButton = document.querySelector('.play-prev');
const playNextButton = document.querySelector('.play-next');

playPrevButton.onclick=playPrev;
playNextButton.onclick=playNext;

let ul=document.querySelector(".play-list");

arrayOfSounds.forEach(elem => {
     let li = document.createElement('li');
     li.classList.add("play-item");
     li.textContent=elem.title;
     ul.append(li);
});

ul.addEventListener("click", selectSound);

function selectSound(){
   if(event.target.classList.contains('play-item')){
    for (let elem of arrayOfSounds){
      if(elem.title==event.target.textContent){
        for(let li of document.querySelectorAll("li")){
          li.style.color="white";
        }
      audio.src=elem.src;
      audio.play();
      play.classList.add('pause');
      isPlay = true;
      event.target.style.color="orange" ; 
      }
    }
   }  
}

function coloredSounds(){
  for (let elem of arrayOfSounds){
    if(elem.src==arrayOfSounds[currentSound].src){
      for(let li of document.querySelectorAll("li")){
        li.style.color="white";
        if(li.textContent==elem.title){
          li.style.color="orange" ; 
        }
      }  
    }
  }
}