import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FlierService {
  url: string;
  authInformations: any;

  constructor(private http: HttpClient) {
    this.url = environment.flierApi;
    this.authInformations = localStorage.getItem('auth');
    this.authInformations = JSON.parse(this.authInformations);
  }

  async get(query) {
    let params = new HttpParams();
    Object.keys(query).forEach(param => {
      params = params.append(param, query[param]);
    });

    return this.http.get(`${this.url}/flier`, {
      headers: new HttpHeaders({
        "x-access-token": this.authInformations.accessToken
      }),
      params
    }).toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }

  async getById(id) {
    return this.http.get(`${this.url}/flier/${id}`, {
      headers: new HttpHeaders({
        "x-access-token": this.authInformations.accessToken
      })
    }).toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }

  async create(flier) {
    return this.http.post(`${this.url}/flier`, flier, {
      headers: new HttpHeaders({
        "x-access-token": this.authInformations.accessToken
      })
    })
      .toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }

  async update(body, id) {
    return this.http.put(`${this.url}/flier/${id} `, body, {
      headers: new HttpHeaders({
        "x-access-token": this.authInformations.accessToken
      })
    })
      .toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }

  async delete(id) {
    return this.http.delete(`${this.url}/flier/${id}`, {
      headers: new HttpHeaders({
        "x-access-token": this.authInformations.accessToken
      })
    }).toPromise()
      .catch((err: HttpErrorResponse) => Promise.reject(err));
  }
}
