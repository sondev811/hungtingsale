import { HomeService } from 'src/app/services/home.service';
import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { API_CONFIG } from 'src/app/constants/api.constant';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnChanges {
  @Input() menuType: string;
  @Input() categoriesList: Array<Object>;
  @Input() totalPage: Number;
  @Output() onLoadMore = new EventEmitter<string>();
  @Output() onSearch = new EventEmitter();
  keyword: string;
  appConfig = API_CONFIG;
  isActiveClearSearch: boolean;
  constructor(public moviesService: MoviesService, private homeService: HomeService) {
  }

  ngOnInit() {
    this.homeService.activeMenu.subscribe(() => {
      this.keyword = null;
      this.moviesService.keyword = null;
      this.moviesService.searched = false;
      this.isActiveClearSearch = false;
    });
  }

  ngOnChanges() {
  }

  loadMoreMovies() {
    this.onLoadMore.emit(this.menuType);
  }

  getImageMovie(posterPath, backdropPath) {
    return this.appConfig.W500IMAGE(posterPath || backdropPath);
  }

  onSearchMovie() {
    this.moviesService.keyword = this.keyword;
    this.onSearch.emit()
  }

  keywordChange(keyword: String) {
    if (keyword) {
      this.isActiveClearSearch = true;
      return;
    } 
    this.isActiveClearSearch = false;
  }

  clearSearch() {
    this.isActiveClearSearch = false;
    if (!this.moviesService.searched) {
      this.keyword = null;
      this.moviesService.keyword = null;
      return;
    }
    this.homeService.activeMenu.next(this.menuType);
  }

}
