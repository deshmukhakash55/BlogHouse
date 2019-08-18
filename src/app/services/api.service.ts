import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }
  baseUrl = 'http://localhost:8085/';
  accessToken = '';
  refreshToken = '';
  tokenType = '';
  expiry = null;
  isLoggedIn = false;

  login(loginPayload: string) {
    const headers = {
      Authorization: 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    };
    return this.http.post('http://localhost:8085/' + 'oauth/token', loginPayload, {headers});
  }

  getCurrentUsername() {
    // tslint:disable-next-line: max-line-length
    console.log('Making the request using ' + JSON.parse(window.sessionStorage.getItem('token')).access_token + ' ' + JSON.parse(window.sessionStorage.getItem('token')).refresh_token + ' ' + JSON.parse(window.sessionStorage.getItem('token')).token_type + ' ' + JSON.parse(window.sessionStorage.getItem('token')).expires_in);
    const httpHeaders = new HttpHeaders({
      // tslint:disable-next-line: max-line-length
      Authorization : JSON.parse(window.sessionStorage.getItem('token')).token_type.toString() + ' ' + JSON.parse(window.sessionStorage.getItem('token')).access_token.toString()
    });
    const options = {
      headers: httpHeaders
    };
    return this.http.post(this.baseUrl + 'users/current_user', null, options);
  }

  setTokenData(accesstoken: string, refreshtoken: string, expiresin: number, tokentype: string) {
    this.accessToken = accesstoken;
    this.refreshToken = refreshtoken;
    this.expiry = expiresin;
    this.tokenType = tokentype;
    this.isLoggedIn = true;
    window.sessionStorage.setItem('refreshToken', this.refreshToken);
  }

  setRefreshTokenTime(refreshTime: Date) {
    const currentDateMilliSeconds = new Date().getMilliseconds();
    // window.setInterval(this.refreshTokenFunction, refreshTime.getMilliseconds() - currentDateMilliSeconds);
  }

  refreshTokenFunction(): Observable<any> {
    const body = new HttpParams()
      .set('refresh_token', window.sessionStorage.getItem('refreshToken'))
      .set('grant_type', 'refresh_token');
    const headers = {
      Authorization: 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    };
    return this.http.post('http://localhost:8085/' + 'oauth/token', body.toString(), {headers});
  }

}
