import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

@NgModule({
  declarations: [MovieListComponent],
  imports: [
    CommonModule,
    NgxUsefulSwiperModule
  ],
  exports: [MovieListComponent]
})
export class MovieListModule { }
