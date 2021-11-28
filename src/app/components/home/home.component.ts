import { CATEGORIES } from './../../constants/base.constants';
import { TV_TYPE } from './../../constants/api.constant';
import { Component, OnChanges, OnInit } from '@angular/core';
import { MOVIE_TYPE } from 'src/app/constants/api.constant';
import { MoviesService } from 'src/app/services/movies.service';
import { HomeService } from 'src/app/services/home.service';
import { IMovieResponse } from 'src/app/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movieType = MOVIE_TYPE;
  tvType = TV_TYPE;
  movieTrendingList: Array<Object>;
  movieTopRateList: Array<Object>;
  tvTrendingList: Array<Object>;
  categories = CATEGORIES;
  constructor(private moviesService: MoviesService, public homeService: HomeService ) { }

  ngOnInit() {
    // Load movies
    this.getListByType();
     // this.moviesService.movieTrendingList.subscribe({
    //   next: (data) => {
    //     if (data && data.length) {
    //       this.movieTrendingList = data;
    //     }
    //   }
    // });
  }

  getListByType() {
    // Get list movies trending
    this.moviesService.getListByType(CATEGORIES.MOVIES, this.movieType.POPULAR).subscribe({
      next: (data: IMovieResponse) => {
        if (!data || !data.results) {
          return;
        }
        this.movieTrendingList = data.results;
      }
    });
    // Get list movies top rate
    this.moviesService.getListByType(CATEGORIES.MOVIES, this.movieType.TOP_RATE).subscribe({
      next: (data: IMovieResponse) => {
        if (!data || !data.results) {
          return;
        }
        this.movieTopRateList = data.results;
      }
    });
    // Get list TV series trending
    this.moviesService.getListByType(CATEGORIES.TV_SERIES, this.tvType.POPULAR).subscribe({
      next: (data: IMovieResponse) => {
        if (!data || !data.results || !data.total_pages) {
          return;
        }
        this.tvTrendingList = data.results;
      }
    });
  }

  

}
