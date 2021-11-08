import { MoviesService } from './../../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CATEGORIES } from 'src/app/constants/base.constants';
import { IMovieDetail } from 'src/app/models/movie-detail';
import { API_CONFIG } from 'src/app/constants/api.constant';

@Component({
  selector: 'app-watch-movie',
  templateUrl: './watch-movie.component.html',
  styleUrls: ['./watch-movie.component.scss']
})
export class WatchMovieComponent implements OnInit {
  movieID: number;
  movieUrl: string;
  menuType: string;
  movieData: IMovieDetail;
  constructor(private route: ActivatedRoute, private router: Router, private moviesService: MoviesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!this.router.url || !params || !params['id']) {
       return; 
      }
      this.movieID = params['id'];
      this.menuType = this.capitalizeFirstLetter(this.router.url.slice(1));
      if (this.menuType.includes(CATEGORIES.MOVIES)) {
        this.menuType = CATEGORIES.MOVIES;
      } else {
        this.menuType = CATEGORIES.TV_SERIES;
      }
      this.moviesService.getDetail(this.menuType, this.movieID).subscribe({
        next: (data: IMovieDetail) => {
          if (!data) {
            return;
          }
          this.movieData = data;
          this.movieUrl = `https://www.2embed.ru/embed/tmdb/movie?id=${this.movieID}`;
        }
      });
    });
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
