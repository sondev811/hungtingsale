import { CATEGORIES } from './../../constants/base.constants';
import { TV_TYPE } from './../../constants/api.constant';
import { Component, OnChanges, OnInit } from '@angular/core';
import { MOVIE_TYPE } from 'src/app/constants/api.constant';
import { MoviesService } from 'src/app/services/movies.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movieType = MOVIE_TYPE;
  tvType = TV_TYPE;
  movieTrendingList: Array<Object>;
  movieTopRateList: Array<Object>;
  movieUpcomingList: Array<Object>;
  tvTrendingList: Array<Object>;
  categories = CATEGORIES;
  activeMenu = CATEGORIES.HOME;
  categoriesList = [];
  page = 1;
  totalPageTV: number;
  totalPageMovie: number;
  totalPage: number;
  constructor(private moviesService: MoviesService, public homeService: HomeService ) { }

  ngOnInit() {
    // Handle load movie when click menu
    this.handleCategories();
    // Load movies
    this.getListByType();

     // this.moviesService.movieTrendingList.subscribe({
    //   next: (data) => {
    //     if (data && data.length) {
    //       this.movieTrendingList = data;
    //     }
    //   }
    // });
  }

  handleCategories() {
    this.homeService.activeMenu.subscribe((type) => {
      this.activeMenu = type;
      this.categoriesList = [];
      this.moviesService.page = 1;
      // this.loading();
      if (this.activeMenu === this.categories.HOME) {
        return;
      }
      if (this.activeMenu === this.categories.MOVIES) {
        this.categoriesList = this.movieUpcomingList;
        this.totalPage = this.totalPageMovie;
        return;
      } 
      this.categoriesList = this.tvTrendingList;
      this.totalPage = this.totalPageTV;
    });
  }

  loading() {
    const loadingElement = document.querySelector('.app-loading');
    loadingElement.classList.add('loaded');
    setTimeout(() => loadingElement.classList.remove('loaded'), 350);
  }

  getListByType() {
    // Get list movies trending
    this.moviesService.getListByType(CATEGORIES.MOVIES, this.movieType.POPULAR).subscribe({
      next: (data: any) => {
        if (!data || !data.results) {
          return;
        }
        this.movieTrendingList = data.results;
      }
    });
    // Get list movies top rate
    this.moviesService.getListByType(CATEGORIES.MOVIES, this.movieType.TOP_RATE).subscribe({
      next: (data: any) => {
        if (!data || !data.results) {
          return;
        }
        this.movieTopRateList = data.results;
      }
    });
    // Get list movies upcoming
    this.moviesService.getListByType(CATEGORIES.MOVIES, this.movieType.UP_COMING).subscribe({
      next: (data: any) => {
        if (!data || !data.results || !data.total_pages) {
          return;
        }
        this.movieUpcomingList = data.results;
        this.totalPageMovie = data.total_pages;
      }
    });
    // Get list TV series trending
    this.moviesService.getListByType(CATEGORIES.TV_SERIES, this.tvType.POPULAR).subscribe({
      next: (data: any) => {
        if (!data || !data.results || !data.total_pages) {
          return;
        }
        this.totalPageTV = data.total_pages;
        this.tvTrendingList = data.results;
      }
    });
  }

  loadMoreMovies(event: string) {
    this.moviesService.page += 1;
    if (this.moviesService.keyword) {
      this.moviesService.search(this.moviesService.keyword, this.moviesService.page, this.activeMenu).subscribe({
          next: (data: any) => {
            if (!data || !data.results) {
              return;
            }
            this.categoriesList.push(...data.results);
          }
      });
      return;
    }
    this.moviesService.getListByType(event, this.movieType.UP_COMING, this.moviesService.page).subscribe({
      next: (data: any) => {
        if (!data || !data.results) {
          return;
        }
        this.categoriesList.push(...data.results);
      }
    });
  }

  onSearch() {
    this.moviesService.page = 1;
    this.moviesService.searched = !this.moviesService.searched;
    this.moviesService.search(this.moviesService.keyword, this.moviesService.page, this.activeMenu).subscribe({
      next: (data: any) => {
        if (!data || !data.results) {
          return;
        }
        this.categoriesList = data.results;
        this.totalPage = data.total_pages;
      }
    });
  }

}
