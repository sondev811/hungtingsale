import { HttpClientService } from './../../services/http-client.service';
import { MOVIE_TYPE, TV_TYPE } from './../../constants/api.constant';
import { HomeService } from 'src/app/services/home.service';
import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { API_CONFIG } from 'src/app/constants/api.constant';
import { MoviesService } from 'src/app/services/movies.service';
import { CATEGORIES } from 'src/app/constants/base.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { IAPIGenres, IGenre } from 'src/app/models/genres';
import { IMovieResponse } from 'src/app/models/movie';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  menuType: string;
  menuTypeText: string;
  keyword: string;
  appConfig = API_CONFIG;
  categories = CATEGORIES;
  isActiveClearSearch: boolean;
  movieList = [];
  totalPage = 0;
  totalMoviePage = 0;
  totalTVPage = 0;
  searched = false;
  page = 1;
  movieUpcomingList = [];
  tvSeriesList = [];
  genreID: number;
  genreNameRoute: string;

  constructor(public moviesService: MoviesService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    if (!this.router || !this.router.url) {
      return;
    }
    this.menuType = this.capitalizeFirstLetter(this.router.url.slice(1));
    if (this.menuType.includes(CATEGORIES.MOVIES)) {
      this.menuType = CATEGORIES.MOVIES;
    } else {
      this.menuType = CATEGORIES.TV_SERIES;
    }
    this.menuTypeText = this.menuType;
    this.route.params.subscribe(params => {
      if (!params || !params.name) {
        return;
      }
      this.genreNameRoute = params['name'];
      this.menuTypeText = this.moviesService.handleGenreName(this.genreNameRoute);
      this.genreID = this.moviesService.handleId(this.genreNameRoute);
    });
    if (this.genreNameRoute) {
      this.getGenres(this.menuType);
      return;
    }
    if (this.menuType === CATEGORIES.MOVIES) {
      this.moviesService.getListByType(CATEGORIES.MOVIES, MOVIE_TYPE.UP_COMING).subscribe({
        next: (data: IMovieResponse) => {
          if (!data || !data.results || !data.total_pages) {
            return;
          }
          this.movieList = data.results;
          this.movieUpcomingList = this.moviesService.handleMovieList(this.movieList);
          this.totalPage = data.total_pages;
          this.totalMoviePage = this.totalPage;
        }
      });
    } else {
      this.moviesService.getListByType(CATEGORIES.TV_SERIES, MOVIE_TYPE.POPULAR).subscribe({
        next: (data: IMovieResponse) => {
          if (!data || !data.results || !data.total_pages) {
            return;
          }
          this.movieList = data.results;
          this.tvSeriesList = this.moviesService.handleMovieList(this.movieList);
          this.totalPage = data.total_pages;
          this.totalTVPage = this.totalPage;
        }
      });
    }
  }

  getGenres(type: string) {
    this.moviesService.getListByGenre(this.menuType, this.genreID, this.page).subscribe({
      next: (data: any) => {
        this.movieList = data.results;
        this.totalPage = data.total_pages;
      }
    });
  }

  getListByGenre() {

  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getImageMovie(posterPath, backdropPath) {
    return this.appConfig.W500IMAGE(posterPath || backdropPath);
  }

  keywordChange(keyword: string) {
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
      next: (data: IMovieResponse) => {
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
          next: (data: IMovieResponse) => {
            if (!data || !data.results) {
              return;
            }
            this.movieList.push(...data.results);
          }
      });
      return;
    }
    if (this.genreNameRoute) {
      this.moviesService.getListByGenre(this.menuType, this.genreID, this.page).subscribe({
        next: (data: IMovieResponse) => {
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
      next: (data: IMovieResponse) => {
        if (!data || !data.results) {
          return;
        }
        this.movieList.push(...data.results); // push array to array
      }
    });
  }

}
