import { HttpClientService } from './../../services/http-client.service';
import { CATEGORIES } from 'src/app/constants/base.constants';
import { IGenre } from './../../models/genres';
import { Component, OnInit } from '@angular/core';
import { IAPIGenres } from 'src/app/models/genres';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  movieGenres: Array<IGenre>;
  tvGenres: Array<IGenre>;
  constructor(private moviesService: MoviesService, private http: HttpClientService) { }

  ngOnInit() {
    this.moviesService.getListGenres(CATEGORIES.MOVIES).subscribe({
      next: async(data: IAPIGenres) => {
        if (!data) {
          return;
        }
        this.movieGenres = data.genres;
        await this.movieGenres.map((item: IGenre) => {
          item.link = `${item.id}-${this.moviesService.handleTitle(item.name)}`;
        });
      }
    });
    this.moviesService.getListGenres(CATEGORIES.TV_SERIES).subscribe({
      next: async(data: IAPIGenres) => {
        if (!data) {
          return;
        }
        this.tvGenres = data.genres;
        this.tvGenres.map((item: IGenre) => {
          item.link = `${item.id}-${this.moviesService.handleTitle(item.name)}`;
        });
      }
    });
  }
}
