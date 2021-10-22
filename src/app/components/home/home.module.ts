import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SlidesModule } from '../slides/slides.module';
import { MovieListModule } from '../movie-list/movie-list.module';
import { MoviesService } from 'src/app/services/movies.service';
import { CategoriesModule } from '../categories/categories.module';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SlidesModule,
    MovieListModule,
    CategoriesModule
  ],
  providers: [MoviesService]
})
export class HomeModule { }
