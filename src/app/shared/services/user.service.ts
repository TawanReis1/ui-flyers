import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = "http://localhost:4000/api/v1/user";
  authInformations: any;

  constructor(private http: HttpClient) {
    this.authInformations = localStorage.getItem('auth');
    this.authInformations = JSON.parse(this.authInformations);
  }

  async getById(id) {
    return this.http.get(`${this.url}/${id}`, {
      headers: new HttpHeaders({
        "x-access-token": this.authInformations.accessToken
      })
    }).toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }
}
