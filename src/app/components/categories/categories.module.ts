import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CategoriesComponent]
})
export class CategoriesModule { }
