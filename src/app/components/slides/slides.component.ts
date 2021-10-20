import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { API_CONFIG, MOVIE_TYPE } from 'src/app/constants/api.constant';
import { IAPIResponse } from 'src/app/models/api.model';
import { MoviesService } from 'src/app/services/movies.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})

export class SlidesComponent implements OnInit {
  movies = [];
  isOpenTrailer = false;
  config: SwiperOptions;
  appConfig = API_CONFIG;
  trailerVideo = API_CONFIG.TRAILER_VIDEO('video');
  constructor(private movieService: MoviesService) { }
  async ngOnInit() {
    console.log('detect onInit');
    await this.getMovies();
    this.config = {
      loop: true,
      autoplay: {
        delay: 7000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      },
      grabCursor: true,
      spaceBetween: 0,
      speed: 1000,
      on: {
        slideChange: () => {
          this.closeAllModal();
        }
      }
    };
  }

  getMovies() {
    this.movieService.getMovieListByType(MOVIE_TYPE.POPULAR).subscribe({
      next: (data: IAPIResponse) => {
        if (data && data.results && data.results.length) {
          this.movieService.movieTrendingList.next(data.results);
          this.movies = data.results.slice(0, 4);
          this.movies.map(item => {
            this.movieService.getMovieVideos(item.id).subscribe({
              next: (dataTrailer: IAPIResponse) => {
                console.log(dataTrailer);
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

  openTrailer(videoId: Number) {
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

  closeTrailerModal(videoId: Number) {
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
    const allModal = document.getElementsByClassName('slide-content__modaltrailer');
    for (let i = 0; i < allModal.length; i++) {
      allModal[i].classList.remove('open');
      this.stopVideo(allModal[i]);
    }
    this.isOpenTrailer = false;
  }

  onSlideChange() {
    console.log('slide change');
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
