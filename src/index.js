import { Notify } from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Fetch } from './js/fetch';
const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.btn-load'),
};
const lightbox = new simpleLightbox('.gallery a', {
  captions: true,
  captionPosition: 'bottom',
  captionsData: 'alt',
  captionDelay: 250,
});


var el=document.getElementById('test3');
el.animate([{backgroundColor:'#ffffff'},{backgroundColor:'#E6E6FA'},{backgroundColor:'#778899'},{backgroundColor:'#6495ED'},{backgroundColor:'#4682B4'},{backgroundColor:'#66CDAA'},{backgroundColor:'#7CFC00'},{backgroundColor:'#32CD32'},{backgroundColor:'#EEDD82'}],{duration:10000, iterations:Infinity,});
