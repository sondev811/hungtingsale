import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { SafePipeModule } from 'safe-pipe';

@NgModule({
  declarations: [SlidesComponent],
  imports: [
    CommonModule,
    NgxUsefulSwiperModule,
    SafePipeModule
  ],
  exports: [SlidesComponent]
})
export class SlidesModule { }
