import { TV_TYPE } from './../../constants/api.constant';
import { Component, OnInit } from '@angular/core';
import { MOVIE_TYPE } from 'src/app/constants/api.constant';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movieType = MOVIE_TYPE;
  tvType = TV_TYPE;
  movieTrendingList: Array<Object>;
  movieTopRateList: Array<Object>;
  tvTrendingList: Array<Object>;
  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.movieTrendingList.subscribe({
      next: (data) => {
        if (data && data.length) {
          this.movieTrendingList = data;
        }
      }
    });
    this.moviesService.getMovieListByType(this.movieType.TOP_RATE).subscribe({
      next: (data: any) => {
        if (data && data.results) {
          this.movieTopRateList = data.results;
        }
      }
    });
    this.moviesService.getTVListByType(this.tvType.POPULAR).subscribe({
      next: (data: any) => {
        if (data && data.results) {
          this.tvTrendingList = data.results;
        }
      }
    });
  }

}
