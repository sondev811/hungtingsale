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
  movieTrendingList: Array<Object>;
  movieTopRateList: Array<Object>;
  movieUpcomingList: Array<Object>;
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
      next: (data: Array<Object>) => {
        if (data && data.length) {
          this.movieTopRateList = data;
        }
      }
    });
    this.moviesService.getMovieListByType(this.movieType.UP_COMING).subscribe({
      next: (data: Array<Object>) => {
        if (data && data.length) {
          this.movieUpcomingList = data;
        }
      }
    });
  }

}
