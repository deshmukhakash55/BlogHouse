import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin = false;

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private loginService: LoginService) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.apiService.login(body.toString()).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      const dataJson = JSON.parse(JSON.stringify(data));
      this.apiService.setTokenData(dataJson.access_token, dataJson.refresh_token, dataJson.expires_in, dataJson.token_type);
      const tokenExpiryDate = new Date();
      tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + (dataJson.expires_in));
      window.sessionStorage.setItem('expiry', tokenExpiryDate.toString());
      this.router.navigate(['home']);
    });
  }

  ngOnInit() {
    this.loginService.loginAndTokenCheck('');
    // window.sessionStorage.removeItem('token');
    // window.sessionStorage.removeItem('username');
    // window.sessionStorage.removeItem('user');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}
