import { MOVIE_TYPE, TV_TYPE } from './../../constants/api.constant';
import { HomeService } from 'src/app/services/home.service';
import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { API_CONFIG } from 'src/app/constants/api.constant';
import { MoviesService } from 'src/app/services/movies.service';
import { CATEGORIES } from 'src/app/constants/base.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  menuType: string;
  keyword: string;
  appConfig = API_CONFIG;
  isActiveClearSearch: boolean;
  movieList = [];
  totalPage = 0;
  totalMoviePage = 0;
  totalTVPage = 0;
  searched = false;
  page = 1;
  movieUpcomingList = [];
  tvSeriesList = [];
  constructor(public moviesService: MoviesService, private homeService: HomeService, private router: Router) {
  }

  ngOnInit() {
    if(this.router.url) {
      this.menuType = this.capitalizeFirstLetter(this.router.url.slice(1));
    }
    if (this.menuType !== CATEGORIES.MOVIES) {
      this.menuType = CATEGORIES.TV_SERIES;
    }

    if (this.menuType === CATEGORIES.MOVIES) {
      this.moviesService.getListByType(CATEGORIES.MOVIES, MOVIE_TYPE.UP_COMING).subscribe({
        next: (data: any) => {
          if (!data || !data.results || !data.total_pages) {
            return;
          }
          this.movieList = data.results;
          this.movieUpcomingList = this.movieList;
          this.totalPage = data.total_pages;
          this.totalMoviePage = this.totalPage;
        }
      });
    } else {
      this.moviesService.getListByType(CATEGORIES.TV_SERIES, MOVIE_TYPE.POPULAR).subscribe({
        next: (data: any) => {
          if (!data || !data.results || !data.total_pages) {
            return;
          }
          this.movieList = data.results;
          this.tvSeriesList = this.movieList;
          this.totalPage = data.total_pages;
          this.totalTVPage = this.totalPage;
        }
      });
    }
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getImageMovie(posterPath, backdropPath) {
    return this.appConfig.W500IMAGE(posterPath || backdropPath);
  }

  keywordChange(keyword: String) {
    if (keyword) {
      this.isActiveClearSearch = true;
      return;
    } 
    this.isActiveClearSearch = false;
  }

  clearSearch() {
    this.isActiveClearSearch = false;
    this.keyword = null;
    if (!this.searched) {
      return;
    }
      this.searched = false;
      this.movieList = [];
      this.page = 1;
      if (this.menuType === CATEGORIES.MOVIES) {
        this.movieList = this.movieUpcomingList;
        this.totalPage = this.totalMoviePage;
        return;
      } 
      this.movieList = this.tvSeriesList;
      this.totalPage = this.totalTVPage;
  }

  onSearch() {
    this.searched = true;
    this.page = 1;
    this.moviesService.search(this.keyword, this.page, this.menuType).subscribe({
      next: (data: any) => {
        if (!data || !data.results) {
          return;
        }
        this.movieList = data.results;
        this.totalPage = data.total_pages;
      }
    });
  }

  loadMoreMovies() {
    this.page += 1;
    if (this.keyword) {
      this.moviesService.search(this.keyword, this.page, this.menuType).subscribe({
          next: (data: any) => {
            if (!data || !data.results) {
              return;
            }
            this.movieList.push(...data.results);
          }
      });
      return;
    }
    let movieType = MOVIE_TYPE.UP_COMING;
    if (this.menuType === CATEGORIES.TV_SERIES) {
      movieType = TV_TYPE.POPULAR;
    }
    this.moviesService.getListByType(this.menuType, movieType, this.page).subscribe({
      next: (data: any) => {
        if (!data || !data.results) {
          return;
        }
        this.movieList.push(...data.results);
      }
    });
  }

}
