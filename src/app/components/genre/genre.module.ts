import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreComponent } from './genre.component';

const routes: Routes = [
  { path: '', component: GenreComponent}
];
@NgModule({
  declarations: [GenreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GenreModule { }
