import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { FormsModule } from '@angular/forms';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'genre/:name', component: CategoriesComponent },
  { path: 'detail/:id', component: MovieDetailComponent }
];

@NgModule({
  declarations: [CategoriesComponent, MovieDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class CategoriesModule { }
