import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: './components/home/home.module#HomeModule'
      }, 
      {
        path: 'movies',
        loadChildren: './components/categories/categories.module#CategoriesModule'
      }, 
      {
        path: 'tv-series',
        loadChildren: './components/categories/categories.module#CategoriesModule'
      },
      {
        path: 'genres',
        loadChildren: './components/genre/genre.module#GenreModule'
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
