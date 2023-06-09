import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import './css/styles.css';
import PixabyApiService from './js/fetch';
import LoadMoreBtn from './js/load-more-btn';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const lightbox = new SimpleLightbox('.gallery a');
const pixabyApiService = new PixabyApiService();

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', getImages);

function onSearch(e) {
  e.preventDefault();

  pixabyApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (pixabyApiService.query === '') {
    Notiflix.Notify.info('No query in the form. Please, enter your request');
    return;
  }
  if (!loadMoreBtn.refs.button.hidden) {
    loadMoreBtn.hide();
  }
  pixabyApiService.resetPage();
  clearGalleryContainer();
  getImages();
}

async function getImages() {
  loadMoreBtn.disable();
  try {
    const images = await pixabyApiService.fetchImages();
    const hits = images.hits;
    const totalHits = images.totalHits;

    if (hits.length > 0) {
      loadMoreBtn.show();
      appendImagesMarkup(hits);
      loadMoreBtn.enable();

      if (pixabyApiService.imageQty >= totalHits) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        loadMoreBtn.hide();
      }
    } else {
      loadMoreBtn.hide();
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return;
    }
  } catch (error) {
    console.log(error.message);
  }
}

function appendImagesMarkup(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width=320 height=240/></a>
  <div class="info">
  <p class="info-item">Likes: 
    <b>${likes}</b>
  </p>
    <p class="info-item">Views: 
      <b>${views}</b>
    </p>
    <p class="info-item">Comments: 
      <b>${comments}</b>
    </p>
    <p class="info-item">Downloads:
      <b>${downloads}</b> 
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}
