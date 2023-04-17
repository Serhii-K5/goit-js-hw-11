import '../cass/index.scss';
import {playList} from './playlist';

import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


// === SEARCH BAR ===
// --- ітшциалізація констант
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const galleryDiv = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let lightbox = new SimpleLightbox('.gallery a');

const API_KEY = '35066841-52545c4d4852ad26238ef3ed2';

let perPage =
  document.querySelector('.option-input').value > 0
    ? document.querySelector('.option-input').value
    : 40;
let page = 1;

loadMoreBtn.style.display = 'none';

//--- A variant of HTTP-requests through the axios library. /
//--- Варіант HTTP-запросів через бібліотеку axios. -->
async function getPhoto(searchText) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchText}&orientation=horizontal&safesearch=true&image_type=photo&per_page=${perPage}&page=${page}`
    );
    if (response.status === 404) {
      return [];
    }
    return await response.data;
  } catch (error) {
    return console.error(error);
  }
}
// <-- A variant of HTTP-requests through the axios library

//--- A variant of HTTP-requests through the global fetch method. /
//--- Варіант HTTP-запросів через глобальний метод fetch.   -->
// const getPhoto = async (searchText) => {
//   return await fetch(
//     // `https://pixabay.com/api/?key=${API_KEY}&q=${searchText}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`
//     `https://pixabay.com/api/?key=${API_KEY}&q=${searchText}&orientation=horizontal&safesearch=true&image_type=photo&per_page=${perPage}&page=${page}`
//   )
//     .then(async response => {
//       if (!response.ok) {
//         if (response.status === 404) {
//           return [];
//         }
//         throw new Error(response.status);
//       }
//       return await response.json();
//     })
//     .catch(error => {console.error(error);});
// }
// <-- A variant of HTTP-requests through the global fetch method


function messageOutput() {
  const inputTxt = searchInput.value.trim();
  const optionBar = document.getElementById('option-bar');
  const optionMenu = document.querySelector('.options-menu');
  if (inputTxt !== '') {
    getPhoto(inputTxt)
      .then(photos => {
        if (photos.totalHits > 0) {
          loadMoreBtn.style.display = photos.totalHits / perPage > page ? 'block' : 'none';

          optionBar.style.display = 'none';
          optionMenu.style.display = 'none';

          galleryCreation(photos.hits);
          const downloadPhotos =
            perPage * page > photos.totalHits ? photos.totalHits : perPage * page;
          Notiflix.Notify.success(
            `Hooray! We found ${photos.totalHits} images. Download ${downloadPhotos} photos`
          );
          lightbox.refresh();
        } else {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          optionBar.style.display = 'block';
          optionMenu.style.display = 'block';
        }
      })
      .catch(error => {
        console.error(error);
      });
  } else if (optionBar.style.display === 'none') {
    optionBar.style.display = 'block';
    optionMenu.style.display = 'block';
  }
}

// --- прослуховування натискання кнопки пошуку на панелі "SEARCH BAR"  
searchBtn.addEventListener('click', evt => {
  evt.preventDefault();
  searchCleanup();
  messageOutput();
});

// --- очищення познайдених даних
function searchCleanup() {
  page = 1;
  galleryDiv.innerHTML = '';
  loadMoreBtn.style.display = 'none';
}

// --- прослуховування натискання кнопки завантаження наступного блоку фото 
let counter = 0;
let oldPageYOffset = 0;
loadMoreBtn.addEventListener('click', () => {
  loadMoreBtn.style.display = 'none';
  counter = 0;
  oldPageYOffset = window.pageYOffset;
  page++;
  messageOutput();
});

// --- створення галереї фото
function galleryCreation(photos) {
  galleryDiv.insertAdjacentHTML(
    'beforeend',
    photos.reduce((acc, el) => {
      const htmlCode = `<div class="photo-card">
        <a href="${el.largeImageURL}">
          <img class="photo" src="${el.webformatURL}" alt="${el.tags}" title="${el.tags}" loading="lazy"/>
          <div class="info">
            <p class="info-item">
              <b>Likes</b> <span> ${el.likes} </span>
            </p>
            <p class="info-item">
              <b>Views</b> <span>${el.views}</span>  
            </p>
            <p class="info-item">
              <b>Comments</b> <span>${el.comments}</span>  
            </p>
            <p class="info-item">
              <b>Downloads</b> <span>${el.downloads}</span> 
            </p>
          </div>
        </a>
      </div>`;
      return acc + htmlCode;
    }, '')
  );
}

// === OPTIONS BAR ===
// --- ітшциалізація констант
const optionBar = document.getElementById('option-bar');
const btnOffSmoothScroll = document.getElementById('on-off-btn-smooth-scroll');
const stateOffSmoothScroll = document.getElementById('on-off-state-smooth-scroll');
const btnOffAutoScroll = document.getElementById('on-off-btn-auto-scroll');
const stateOffAutoScroll = document.getElementById('on-off-state-auto-scroll');
const btnOffEndlessScroll = document.getElementById('on-off-btn-endless-scroll');
const stateOffEndlessScroll = document.getElementById('on-off-state-endless-scroll');
const btnOffmusic = document.getElementById('on-off-btn-music');
const stateOffmusic = document.getElementById('on-off-state-music');

// --- встановлення початкових даних
btnOffSmoothScroll.style.textAlign = 'right';
btnOffAutoScroll.style.textAlign = 'left';
btnOffEndlessScroll.style.textAlign = 'left';
btnOffmusic.style.textAlign = 'left';

// --- зміна стану кнопок панелі "OPTIONS BAR"
function stateChange(btnObject, stateObject, state) {
  if (state === 'left') {
    btnObject.style.color = '#00ff00';
    btnObject.style.textAlign = 'right';
    stateObject.textContent = 'on';
  } else {
    btnObject.style.color = '#0a0a0a';
    btnObject.style.textAlign = 'left';
    stateObject.textContent = 'off';
  }
}

// --- прослуховування натискання кнопок панелі "OPTIONS BAR"
optionBar.addEventListener('click', evt => {
  if (evt.target.id === 'on-off-btn-smooth-scroll') {
    stateChange(btnOffSmoothScroll, stateOffSmoothScroll, btnOffSmoothScroll.style.textAlign);  // зміна стану перемикача
    // -- блокування авто-скрола
    if (btnOffSmoothScroll.style.textAlign === 'left') {
      stateChange(btnOffAutoScroll, stateOffAutoScroll, 'right');
      btnOffAutoScroll.disabled = true;
    } else {      
      btnOffAutoScroll.disabled = false;
    }
    return;
  }  
  if (evt.target.id === 'on-off-btn-auto-scroll') {
    stateChange(btnOffAutoScroll, stateOffAutoScroll, btnOffAutoScroll.style.textAlign);  // зміна стану перемикача
    return;
  }
  if (evt.target.id === 'on-off-btn-endless-scroll') {
    stateChange(btnOffEndlessScroll, stateOffEndlessScroll, btnOffEndlessScroll.style.textAlign); // зміна стану перемикача
    return;
  }
  if (evt.target.id === 'on-off-btn-music') {
    stateChange(btnOffmusic, stateOffmusic, btnOffmusic.style.textAlign); // зміна стану перемикача

    if (btnOffmusic.style.textAlign === 'right') {  // -- запуск випадкового трека
      melodyСhange();
      document.querySelector('.audio-gallery').style.display = 'block';
      // noteSound.style.display = 'block';
      
    } else if (noteSound !== null && noteSound !== '') {    // -- зупинка програвача
      noteSound.pause();
      // noteSound.style.display = 'none';
      document.querySelector('.audio-gallery').style.display = 'none';
    };
  }
});


// === Smooth scroll block ===
// --- початок блоку плавного скролу -->
let coefficient;   // для регулювання плавності скролу
// --- прослуховування натискання клавіш клавіатури для припинення скролу
document.addEventListener('keydown', el => {
  if (el.key !== '') {
    oldPageYOffset = window.pageYOffset;
    counter = 0;
  }
});
// --- прослуховування скролу для визначення напрямку прокрутки
window.addEventListener('scroll', () => {
  if (galleryDiv.childElementCount < 1) {
    return;
  }

  if (stateOffSmoothScroll.textContent === 'off') {
    oldPageYOffset = window.pageYOffset;
    counter = 0;
  }

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  if (stateOffEndlessScroll.textContent === 'on') {
    if (
      oldPageYOffset >
        galleryDiv.offsetHeight - window.innerHeight - cardHeight / 2 &&
      loadMoreBtn.style.display !== 'none'
    ) {
      window.innerHeight;
      loadMoreBtn.style.display = 'none';
      page++;
      messageOutput();
    }
  }
  // -- блок плавності скролу
  if (stateOffAutoScroll.textContent === 'off') {
    if (counter < 100) {
      counter++;
    } else {
      counter = 0;
      oldPageYOffset = window.pageYOffset;
      return;
    }
  }

  if (oldPageYOffset !== window.pageYOffset) {
    coefficient =
      window.pageYOffset < oldPageYOffset
        ? -50
        : window.pageYOffset > oldPageYOffset
        ? 50
        : coefficient;

    oldPageYOffset = window.pageYOffset;
    window.scrollBy({
      top: cardHeight / coefficient,
    });
  }
});

// --- прослуховування кліку миші для визначення напрямку скрола
window.addEventListener('click', smoothScroll);

function smoothScroll(evt) {
  if (evt.target.className !== 'gallery' && evt.target.tagName !== 'BODY') {  // фільтр для спрацьовування поза галереєю 
    return;
  }

  if (galleryDiv.childElementCount < 1) { // перевірка наявності єлементів в галереї
    return;
  }

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();    // висота першого елемента галереї
  
  oldPageYOffset = window.pageYOffset;  // призупиняє виконання попередньо запущеного скролу

  coefficient = evt.pageY < window.pageYOffset + window.innerHeight / 2 ? -2 : 2;  // задає напрям скролу

  if (btnOffSmoothScroll.style.textAlign === 'left') {   // перехід по сторінці без плавного скролу
    window.scrollBy({
      top: cardHeight * coefficient,
    });
  } else {
    // запуск плавного скролу за допомогою  behavior
    window.scrollBy({                   
      top: cardHeight * coefficient,
      behavior: 'smooth',
    });
  }
}
// <-- кінець блока плавного скрола

// --- блок контролю кількості фото для виведення
const inputPerPage = document.querySelector('.option-input')
inputPerPage.addEventListener('focusout', () => {
  if (+ inputPerPage.value > 0) {
    perPage = + inputPerPage.value;
  } else {
    alert(`В поле "Number of objects per page" находятся некорректные данные (${inputPerPage.value}). \n Значение будет изменено на "40"`);
    perPage = 40;
  }
});

// === AUDIO BLOCK ===
// --- початок блоку аудіо -->
const noteSound = document.getElementById('js-play');
// --- прослуховування закінчення треку 
noteSound.addEventListener( 'ended', melodyСhange);

// --- зміна треку
function melodyСhange() {
  const track = getRandomInt(playList.length - 1);
  // const track = getRandomInt(4);
  audioTrack.textContent = `Track # ${track}`;
  noteSound.src = playList[track];

  playMelody(track);
} 

const audioTrack = document.getElementById('audio-track');
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function playMelody(track) {
  noteSound.currentTime = 0;
  noteSound.play();
}
// <-- закінчення блоку аудіо
