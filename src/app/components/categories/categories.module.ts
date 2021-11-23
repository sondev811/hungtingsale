import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { FormsModule } from '@angular/forms';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SafePipeModule } from 'safe-pipe';
import { MovieListModule } from '../movie-list/movie-list.module';
import { WatchMovieComponent } from './watch-movie/watch-movie.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'genre/:name', component: CategoriesComponent },
  { path: 'detail/:id', component: MovieDetailComponent },
  { path: 'watch/:id', component: WatchMovieComponent },
  { path: 'watch/:id/:season/:episode', component: WatchMovieComponent }
];

@NgModule({
  declarations: [CategoriesComponent, MovieDetailComponent, WatchMovieComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SafePipeModule,
    MovieListModule
  ],
  exports: []
})
export class CategoriesModule { }
