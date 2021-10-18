import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CATEGORY } from '../constants/api.constant';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClientService) {}

  getMovieListByType(type: String) {
    return this.http.get(CATEGORY.MOVIE + type);
  }

  getTVListByType(type: String) {
    return this.http.get(CATEGORY.TV + type);
  }

  getMovieVideos(id: Number) {
    return this.http.get(CATEGORY.MOVIE + id + CATEGORY.VIDEOS);
  }

  getTVVideos(id: Number) {
    return this.http.get(CATEGORY.TV + id + CATEGORY.VIDEOS);
  }

  movieSearch() {
    return this.http.get(CATEGORY.SEARCH + CATEGORY.MOVIE);
  }

  tvSearch() {
    return this.http.get(CATEGORY.SEARCH + CATEGORY.TV);
  }

  getDetailMovie(id: Number) {
    return this.http.get(CATEGORY.MOVIE + id);
  }

  getDetailTV(id: Number) {
    return this.http.get(CATEGORY.TV + id);
  }

  getCreditMovie(id: Number) {
    return this.http.get(CATEGORY.MOVIE + id + CATEGORY.CREDITS);
  }

  getCreditTV(id: Number) {
    return this.http.get(CATEGORY.TV + id + CATEGORY.CREDITS);
  }

  getSimilarMovie(id: Number) {
    return this.http.get(CATEGORY.MOVIE + id + CATEGORY.SIMILAR);
  }

  getSimilarTV(id: Number) {
    return this.http.get(CATEGORY.TV + id + CATEGORY.SIMILAR);
  }

}
