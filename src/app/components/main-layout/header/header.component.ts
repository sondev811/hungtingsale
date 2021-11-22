import { HttpClientService } from './../../../services/http-client.service';
import { CATEGORIES } from './../../../constants/base.constants';
import { HomeService } from './../../../services/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menu = CATEGORIES;
  constructor(public homeService: HomeService, public http: HttpClientService) { }

  ngOnInit() {
    this.shrinkHeader();
    this.jumpToTop();
  }

  clickMenu(type: string) {
  }

  shrinkHeader() {
    const header = document.getElementById('headerShrink');
    if (header) {
      window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          header.classList.add('shrink');
        } else {
          header.classList.remove('shrink');
        }

      });
    }
  }

  jumpToTop() {
    const btnToTop = document.getElementById('toTop');
    if (btnToTop) {
      window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
          btnToTop.classList.add('active-top');
        } else {
          btnToTop.classList.remove('active-top');
        }
      });

    }
    
    
  }

  goToTop() {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }
}
