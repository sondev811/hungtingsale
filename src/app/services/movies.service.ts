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

  getURL(category: string) {
    return category === CATEGORIES.MOVIES ? CATEGORY.MOVIE : CATEGORY.TV;
  }
  
  getListByType(category: string, type: string, page: number = 1) {
    const url = `${this.getURL(category)}${CATEGORY.LIST}`;
    return this.http.get(url, {page, type});
  }

  getVideos(id: number, category: string) {
    const url = `${this.getURL(category)}${CATEGORY.VIDEOS}`
    return this.http.get(url, {id});
  }

  getListByGenre(category: string , id: number, page: number) {
    const url = `${this.getURL(category)}${CATEGORY.DISCOVER}`;
    return this.http.get(url, {with_genres: id, page});
  }

  getListGenres(category: string) {
    const url = `${this.getURL(category)}${CATEGORY.GENRES}`;
    return this.http.get(url, {});
  }

  search(query: string, page: number, category: string) {
    const url = `${this.getURL(category)}${CATEGORY.SEARCH}`;
    return this.http.get(url, {page, query});
  }

  getDetail(category: string, id: number) {
    return this.http.get(`${this.getURL(category)}${CATEGORY.DETAIL}`, {id});
  }

  getCredit(category: string, id: number) {
    return this.http.get(`${this.getURL(category)}${CATEGORY.CREDITS}`, {id});
  }

  getSimilar(category: string, id: number) {
    return this.http.get(`${this.getURL(category)}${CATEGORY.SIMILAR}`, {id});
  }

  getVisitors() {
    return this.http.getVisitors('https://api.countapi.xyz/hit/smovies-seven.vercel.app/visits');
  }

  getIMDBRating(id: string) {
    return this.http.get(`${CATEGORY.RATING}`, {id});
  }

}
