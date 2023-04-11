/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};


const imageContainer = document.querySelector('#image-container');
const count = 10;
const apiKey = "m5Y3_1WqxJEaRQjwX5d3YzwfWkU9WP6EjBxQaGKzmx4";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const photos = [];
let isLoading = false;
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
window.addEventListener('scroll', debounce(() => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    if (!isLoading) {
      getPhotos();
    }
  }
}, 300));
function getPhotos() {
  try {
    fetch(apiUrl).then(response => response.json()).then(data => {
      photos.push(...data);
      displayPhotos();
    });
  } catch (error) {
    console.error(error);
  }
}
function displayPhotos() {
  if (photos.length > 0) {
    photos.forEach(photo => {
      const img = document.createElement('img');
      img.classList.add('image');
      img.src = photo.urls.regular;
      img.alt = photo.alt_description;
      img.title = photo.alt_description;
      const card = document.createElement('div');
      card.classList.add('card');
      card.appendChild(img);
      imageContainer.appendChild(card);
    });
    isLoading = false;
  }
}
getPhotos();
/******/ })()
;