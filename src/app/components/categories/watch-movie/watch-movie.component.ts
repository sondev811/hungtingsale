import { IGenre } from './../../../models/genres';
import { IMovie, IMovieResponse } from './../../../models/movie';
import { HttpClientService } from './../../../services/http-client.service';
import { CHANNEL_ACTIVE } from './../../../constants/base.constants';
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
  movieLink: string;
  movieUrlIMDB: string;
  movieUrlTMDB: string;
  menuType: string;
  movieData: IMovieDetail;
  season: string;
  episode: string;
  episodes;
  CHANNEL_ACTIVE = CHANNEL_ACTIVE;
  channelActive = CHANNEL_ACTIVE.tmdb;
  moviesSimilar: Array<IMovie>;
  categories = CATEGORIES;

  constructor(private route: ActivatedRoute, private router: Router, private moviesService: MoviesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!this.router.url || !params || !params['id']) {
       return;
      }
      this.movieLink = params['id'];
      this.movieID = this.moviesService.handleId(params['id']);
      this.menuType = this.capitalizeFirstLetter(this.router.url.slice(1));
      if (this.menuType.includes(CATEGORIES.MOVIES)) {
        this.menuType = CATEGORIES.MOVIES;
        this.moviesService.getDetail(this.menuType, this.movieID).subscribe({
          next: (data: IMovieDetail) => {
            if (!data) {
              return;
            }
            this.movieData = data;
            this.handleGenres();
            console.log(this.movieData);
            this.movieUrlTMDB = `https://2embed.org/embed/${this.movieID}`;
            this.movieUrlIMDB = `https://dbgo.fun/imdb.php?id=${this.movieData.imdb_id}`;
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
            this.handleGenres();
            this.episodes = data.seasons.find(item => item.season_number === parseFloat(this.season));
            this.movieUrlTMDB = `https://www.2embed.org/embed/${this.movieID}/${this.season}/${this.episode}`;
            console.log(this.movieUrlTMDB);
            this.movieUrlIMDB = `https://dbgo.fun/imdbse.php?id=${this.movieData.external_ids.imdb_id}&s=${this.season}&e=${this.episode}`;
          }
        });
      }
      console.log(this.movieData);

      this.getSimilarMovies(this.menuType, this.movieID);
    });
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  handleGenres() {
    this.movieData.genres.map((item: IGenre) => {
      item.link = `${item.id}-${this.moviesService.handleTitle(item.name)}`;
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  chooseChannel(channel: string) {
    this.channelActive = channel;
  }

  async getSimilarMovies(categories: string, id: number) {
    await this.moviesService.getSimilar(categories, id).subscribe({
      next: (data: IMovieResponse) => {
        this.moviesSimilar = data.results;
        console.log(this.moviesSimilar);
      }
    });
  }

}
