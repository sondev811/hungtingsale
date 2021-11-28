import { MoviesService } from './../../../services/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  viewsCount: number;
  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getVisitors().subscribe({
      next: (res: any) => {
        if (!res) {
          return;
        }
        this.viewsCount = res.value;
      }
    })
  }

}
