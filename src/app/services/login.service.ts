import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public apiService: ApiService, public router: Router) { }

  loginAndTokenCheck(url: string) {
    if ( window.sessionStorage.getItem('token') !== null ) {
      const currentDate = new Date();
      const tokenExpiryDate = new Date (window.sessionStorage.getItem('expiry'));
      if ( currentDate < tokenExpiryDate) {
        setInterval( this.refreshMyToken, tokenExpiryDate.getTime() - Date.now() - 60000, this.apiService);
        if ( url === '') {
          this.router.navigate(['home']);
        } else {
          this.router.navigate([url]);
        }
      } else {
        if (this.apiService.accessToken !== window.sessionStorage.getItem('token') ) {
          window.sessionStorage.setItem('token', this.apiService.accessToken);
          // tslint:disable-next-line: no-shadowed-variable
          const tokenExpiryDate = new Date();
          tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + (this.apiService.expiry));
          window.sessionStorage.setItem('expiry', tokenExpiryDate.toString());
        }
      }
    } else {
      this.router.navigate(['']);
    }
  }

  refreshMyToken(apiService: ApiService) {
    apiService.refreshTokenFunction().subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      const dataJson = JSON.parse(JSON.stringify(data));
      apiService.setTokenData(dataJson.access_token, dataJson.refresh_token, dataJson.expires_in, dataJson.token_type);
      // tslint:disable-next-line: no-shadowed-variable
      const tokenExpiryDate = new Date();
      tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + (dataJson.expires_in));
      window.sessionStorage.setItem('expiry', tokenExpiryDate.toString());
    });
  }


}
