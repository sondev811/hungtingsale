import { Component, Input, OnInit } from '@angular/core';
import { MOVIE_TYPE_TEXT } from 'src/app/constants/api.constant';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @Input() movieType: string;
  @Input() movieList: Array<Object>;
  movieTypeText: String;
  constructor() { }

  ngOnInit() {
    if (this.movieType) {
      this.movieTypeText = MOVIE_TYPE_TEXT[this.movieType];
    }
  }

}
