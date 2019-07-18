import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8085/v1/user/';

  constructor(private http: HttpClient) { }

  searchUserByUsername() {
    const accessToken = JSON.parse(JSON.stringify(window.sessionStorage.getItem('token'))).access_token;
    const tokenType = JSON.parse(JSON.stringify(window.sessionStorage.getItem('token'))).token_type;
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      Authorization : tokenType + ' ' + accessToken
    });
    const options = {
      headers: httpHeaders
    };
    const username = window.sessionStorage.getItem('username');
    return this.http.post(this.baseUrl + 'search_user_by_username' + '/' + username.toString(), null, options);
  }

}
