import { TV_TYPE_TEXT } from './../../constants/api.constant';
import { HomeService } from 'src/app/services/home.service';
import { Component, Input, OnInit } from '@angular/core';
import { API_CONFIG, MOVIE_TYPE_TEXT } from 'src/app/constants/api.constant';
import { SwiperOptions } from 'swiper';
import { CATEGORIES } from 'src/app/constants/base.constants';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @Input() movieType: string;
  @Input() movieList: Array<Object>;
  @Input() category: string
  config: SwiperOptions;
  movieTypeText: String;
  appConfig = API_CONFIG;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.config = {
      loop: false,
      autoplay: false,
      grabCursor: true,
      spaceBetween: 15,
      speed: 500,
      breakpoints: {
        1024: {
          slidesPerView: 6,
          spaceBetween: 12
        },
        800: {
          slidesPerView: 4,
          spaceBetween: 10
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 10
        }
      }
    };
    if (this.movieType) {
      this.movieTypeText = this.category === CATEGORIES.MOVIES ? MOVIE_TYPE_TEXT[this.movieType] : TV_TYPE_TEXT[this.movieType];
    }
  }

  seeMore() {
  }

}
