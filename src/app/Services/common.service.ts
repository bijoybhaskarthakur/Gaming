import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public http: HttpClient) { }

  postWitoutAuthService(value, url) {
    return this.http.post(url, value);
  }
  post(value, url) {
    debugger
    let auth = localStorage.getItem('authGame');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': auth
      })
    };
    return this.http.post(url, value,httpOptions);
  }

  post2(value, url){
    let auth = localStorage.getItem('authGame');
    // this.session.store('api_res_status', 'false');
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': auth,
      })
    };
    return this.http.post(url, value, httpOptions);
  }

  getWitoutAuthService(url) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(url, httpOptions);
    //return this.http.get(url);
  }

  get(url) {
    debugger
    let auth = localStorage.getItem('authGame');
    console.log("auth",auth)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': auth
      })
    };
    return this.http.get(url, httpOptions);
    //return this.http.get(url);
  }
}
