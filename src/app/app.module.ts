import { CategoriesModule } from './components/categories/categories.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/main-layout/header/header.component';
import { FooterComponent } from './components/main-layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientService } from './services/http-client.service';
import { GenreModule } from './components/genre/genre.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CategoriesModule,
    GenreModule
  ],
  providers: [HttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
