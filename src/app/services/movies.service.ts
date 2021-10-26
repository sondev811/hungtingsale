import { Injectable } from '@angular/core';
import { CATEGORY } from '../constants/api.constant';
import { HttpClientService } from './http-client.service';
import { CATEGORIES } from '../constants/base.constants';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  // movieTrendingList = new EventEmitter<Array<Object>>();
  constructor(private http: HttpClientService) {}
  
  getListByType(category: string, typeMovie: String, page: Number = 1) {
    const url = `${category === CATEGORIES.MOVIES ? CATEGORY.MOVIE : CATEGORY.TV}${typeMovie}`;
    return this.http.get(url, {page});
  }

  getVideos(id: Number, category: String) {
    const url = `${category === CATEGORIES.MOVIES ? CATEGORY.MOVIE : CATEGORY.TV}${id}${CATEGORY.VIDEOS}`
    return this.http.get(url, {});
  }

  getTVVideos(id: Number) {
    return this.http.get(CATEGORY.TV + id + CATEGORY.VIDEOS, {});
  }

  search(keyword: String, page: number, category: String) {
    const url = `${CATEGORY.SEARCH}${category === CATEGORIES.MOVIES ? CATEGORY.MOVIE : CATEGORY.TV}`;
    return this.http.get(url, {keyword, page});
  }

  getDetail(category: String, id: Number) {
    return this.http.get(`${category === CATEGORIES.MOVIES ? CATEGORY.MOVIE : CATEGORY.TV}${id}`, {});
  }

  getCredit(category: String, id: Number) {
    return this.http.get(`${category === CATEGORIES.MOVIES ? CATEGORY.MOVIE : CATEGORY.TV}${id}${CATEGORY.CREDITS}`, {});
  }

  getSimilarMovie(id: Number) {
    return this.http.get(CATEGORY.MOVIE + id + CATEGORY.SIMILAR, {});
  }

  getSimilarTV(id: Number) {
    return this.http.get(CATEGORY.TV + id + CATEGORY.SIMILAR, {});
  }

}
