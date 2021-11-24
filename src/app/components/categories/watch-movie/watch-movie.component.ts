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
  season: string;
  episode: string;
  episodes;
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
        this.moviesService.getDetail(this.menuType, this.movieID).subscribe({
          next: (data: IMovieDetail) => {
            if (!data) {
              return;
            }
            this.movieData = data;
            this.movieUrl = `https://www.2embed.ru/embed/tmdb/movie?id=${this.movieID}`;
          }
        });
      } else {
        this.menuType = CATEGORIES.TV_SERIES;
        if (!params['season'] || !params['episode']) {
          this.router.navigate(['/404']);
          return;
        }
        this.season = params['season'];
        this.episode = params['episode'];
        this.moviesService.getDetail(this.menuType, this.movieID).subscribe({
          next: (data: IMovieDetail) => {
            if (!data) {
              return;
            }
            this.movieData = data;
            this.episodes = data.seasons.find(item => item.season_number === parseFloat(this.season));
            this.movieUrl = `https://www.2embed.ru/embed/tmdb/tv?id=${this.movieID}&s=${this.season}&e=${this.episode}`;
          }
        });
      }
    });
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  counter(i: number) {
    return new Array(i);
  }

}
