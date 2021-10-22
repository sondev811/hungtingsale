import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  // movieList = new EventEmitter<any>();
  activeMenu = new EventEmitter<string>();
  constructor() { }
}
