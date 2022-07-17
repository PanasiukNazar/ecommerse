import './style.css';
import './cart.js';

const $listShow = document.querySelector('.navigation-show');
const $listHide = document.querySelector('.navigation-hide');
const $navigationItems = document.querySelector('.navigation-block');
const $overlay = document.querySelector('.overlay');
const $coreImg = document.querySelector('.core-imagen');
const $collageShow = document.querySelector('.show-collage');
const $collageHide = document.querySelector('.collage-close');

function showCollage() {
   $collageShow.classList.add('show');
   $overlay.classList.add('show');
}

function closeCollage() {
   $collageShow.classList.remove('show');
   $overlay.classList.remove('show');
}

function show() {
   $listShow.classList.add('hide');
   $listHide.classList.add('show');
   $navigationItems.classList.add('show');
   $overlay.classList.add('show');
}

function hide() {
   $listHide.classList.remove('show');
   $listShow.classList.remove('hide');
   $navigationItems.classList.remove('show');
   $overlay.classList.remove('show');
}

$listShow.addEventListener('click', show);
$listHide.addEventListener('click', hide);
$coreImg.addEventListener('click', showCollage);
$collageHide.addEventListener('click', closeCollage);
