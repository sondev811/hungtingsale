import { Component, OnInit } from '@angular/core';
import { MENU } from 'src/app/constants/base.constants';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menu = MENU;
  activeMenu = MENU.HOME;
  constructor() { }

  ngOnInit() {
    this.shrinkHeader();
  }

  clickMenu(type: string) {
    this.activeMenu = type;
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
}
