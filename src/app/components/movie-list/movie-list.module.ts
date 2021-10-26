import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MovieListComponent],
  imports: [
    CommonModule,
    NgxUsefulSwiperModule,
    RouterModule
  ],
  exports: [MovieListComponent]
})
export class MovieListModule { }
