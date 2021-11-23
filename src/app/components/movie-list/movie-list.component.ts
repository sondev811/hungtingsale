import { TV_TYPE, TV_TYPE_TEXT } from './../../constants/api.constant';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { API_CONFIG, MOVIE_TYPE_TEXT } from 'src/app/constants/api.constant';
import { SwiperOptions } from 'swiper';
import { CATEGORIES } from 'src/app/constants/base.constants';
import {
    SwiperComponent,
    SwiperDirective,
    SwiperConfigInterface,
    SwiperScrollbarInterface,
    SwiperPaginationInterface
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  @Input() movieType: string;
  @Input() movieList: Array<Object>;
  @Input() category: string;
  // @Input() config: SwiperOptions; 
  movieTypeText: String;
  appConfig = API_CONFIG;
  tvText = TV_TYPE_TEXT;
  tvType = TV_TYPE;
  categories = CATEGORIES;
  config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 5,
    speed: 100,
    mousewheel: true,
    scrollbar: true,
    spaceBetween: 20,
    grabCursor: true,
    centeredSlides: false,
    autoplay: {
      delay: 5000
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 12
      },
      800: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      500: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  };
  constructor() { }

  ngOnInit() {
    // console.log('OnInit');
    if (this.movieType) {
      this.movieTypeText = this.category === CATEGORIES.MOVIES ? MOVIE_TYPE_TEXT[this.movieType] : TV_TYPE_TEXT[this.movieType];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('changes', changes);
    // if (changes && changes.config && this.swiperView) {
    //     this.swiperView.config = changes.config;
    //     this.swiperView.update();
    // }
  }

  seeMore() {
  }

  ngAfterViewInit(): void {
  //   console.log('ngAfterViewInit');
  //   // this.swiperView.config = { autoplay: true };
  }

}

