import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SlidesComponent } from '../slides/slides.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent, SlidesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
