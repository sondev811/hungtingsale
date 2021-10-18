import { Component, OnInit } from '@angular/core';
import { MOVIE_TYPE } from 'src/app/constants/api.constant';
import { IAPIResponse } from 'src/app/models/api.model';
import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {
  movies = [];
  constructor(private movieService: MoviesService) { }
  async ngOnInit() {
    await this.getMovies();
  }

  getMovies() {
    this.movieService.getMovieListByType(MOVIE_TYPE.POPULAR).subscribe({
      next: (data: IAPIResponse) => {
        if (data && data.results && data.results.length) {
          this.movies = data.results.slice(0, 5);
        }
      }
    });
  }

  onIndexChange(swiper) {
    console.log(swiper);
  }

}
