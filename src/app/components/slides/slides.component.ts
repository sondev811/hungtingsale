import { HttpClientService } from './../../services/http-client.service';
import { CATEGORIES } from './../../constants/base.constants';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { API_CONFIG, MOVIE_TYPE } from 'src/app/constants/api.constant';
import { IAPIResponse } from 'src/app/models/api.model';
import { MoviesService } from 'src/app/services/movies.service';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})

export class SlidesComponent implements OnInit {
  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  movies = [];
  isOpenTrailer = false;
  appConfig = API_CONFIG;
  trailerVideo = API_CONFIG.TRAILER_VIDEO('video');
  config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    loop: true,
    centeredSlides: false,
    speed: 1000,
    autoplay: {
      delay: 10000,
      disableOnInteraction: true
    },
    grabCursor: true
  };
  constructor(private movieService: MoviesService, private http: HttpClientService) { }
  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getListByType(CATEGORIES.MOVIES, MOVIE_TYPE.POPULAR).subscribe({
      next: async (data: IAPIResponse) => {
        if (data && data.results && data.results.length) {
          // this.movieService.movieTrendingList.next(data.results);
          this.movies = data.results.slice(0, 4);
          this.movies = this.movieService.handleMovieList(this.movies);
          await this.movies.map(item => {
            this.movieService.getVideos(item.id, CATEGORIES.MOVIES).subscribe({
              next: (dataTrailer: IAPIResponse) => {
                if (dataTrailer && dataTrailer.results && dataTrailer.results.length) {
                    item['trailer'] = this.appConfig.TRAILER_VIDEO(dataTrailer.results[0].key);
                }
              }
            });
            item.backdrop_path = item.backdrop_path
            ? API_CONFIG.ORIGINAL_IMAGE(item.backdrop_path)
            : API_CONFIG.ORIGINAL_IMAGE(item.poster_path);
          });
        }
      }
    });
  }

  openTrailer(videoId: number) {
    this.componentRef.directiveRef.stopAutoplay();
    const modal = document.getElementsByClassName(`trailer-modal-${videoId}`);
    if (modal && modal.length > 1) {
      for (let i = 0; i < modal.length; i++) {
        modal[i].classList.add('open');
      }
    } else {
      modal[0].classList.add('open');
    }
    this.isOpenTrailer = true;
  }

  closeTrailerModal(videoId: number) {
    this.componentRef.directiveRef.startAutoplay();
    const modal = document.getElementsByClassName(`trailer-modal-${videoId}`);
    if (modal && modal.length > 1) {
      for (let i = 0; i < modal.length; i++) {
        modal[i].classList.remove('open');
      }
    } else {
      modal[0].classList.remove('open');
      this.stopVideo(modal[0]);
    }
    this.isOpenTrailer = false;
  }

  closeAllModal() {
    this.componentRef.directiveRef.startAutoplay();
    const allModal = document.getElementsByClassName('slide-content__modaltrailer');
    for (let i = 0; i < allModal.length; i++) {
      allModal[i].classList.remove('open');
      this.stopVideo(allModal[i]);
    }
    this.isOpenTrailer = false;
  }

  stopVideo(modal: any) {
    // stop video
    const  iframes = modal.getElementsByTagName('iframe');
    if (iframes != null) {
      for (let i = 0; i < iframes.length; i++) {
          iframes[i].src = iframes[i].src;
      }
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isOpenTrailer) {
      this.closeAllModal();
    }
  }

}
