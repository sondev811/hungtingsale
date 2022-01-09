import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_CONFIG } from '../constants/api.constant';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  loading = false;
  constructor(
    private http: HttpClient,
    private router: Router) { }

  getURL(url: string, params) {
    if (url) {
      const urlWithParams = this.handleParams(params);
      url = `${environment.BASE_URL}${url}${urlWithParams}`;
    }
    return url;
  }

  handleParams(params) {
    let urlWithParams = '';
    const keys = Object.keys(params);
    const values = Object.values(params);
    if (!keys || !keys.length || !values || !values.length) {
      return urlWithParams;
    }
    urlWithParams = '?';
    keys.forEach((item, index) => {
      if (index >= 1) {
        urlWithParams += '&';
      }
      urlWithParams += `${item}=${values[index]}`;
    });
    return urlWithParams;
  }

  getHeader() {
    const headers = {
      'Content-Type': 'application/json'
    };
    return new HttpHeaders(headers);
  }

  get(url: string, params: any) {
    this.loading = true;
    let loadingTimeout = null;
    url = this.getURL(url, params);
    const headers = this.getHeader();
    return new Observable(subscriber => {
      this.http.get(url, { headers })
        .subscribe({
          next: (res: Object) => {
            clearTimeout(loadingTimeout);
            loadingTimeout = setTimeout(() => {
              this.loading = false;
            }, 500);
            subscriber.next(res);
          },
          error: (err) => {
            // this.handleError(err, subscriber, () => {
            //   this.get(url).subscribe(subscriber);
            // });
          }
        });
    });
  }

  getVisitors(url: string) {
    return new Observable(subscriber => {
      this.http.get(url, {})
        .subscribe({
          next: (res: Object) => {
            subscriber.next(res);
          },
          error: (err) => {
            // this.handleError(err, subscriber, () => {
            //   this.get(url).subscribe(subscriber);
            // });
          }
        });
    });
  }

}
