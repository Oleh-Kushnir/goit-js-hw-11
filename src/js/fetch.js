import axios from 'axios';
import { Notify } from 'notiflix';

export class Fetch {
  constructor() {
    this.baseURL = 'https://pixabay.com/api/';
    this.key = '34448080-08ea3992a6669e170b3456efa';
    this.query = '';
    this.page = 1;
    this.prePage = 40;
  }

  async fetchImages() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${this.key}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      this.page += 1;
      return response.data;
    } catch (error) {
      Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    }
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
