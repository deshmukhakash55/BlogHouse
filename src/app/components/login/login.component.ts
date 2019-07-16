import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { User } from '../../model/User';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin = false;

  user: Observable<User[]>;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private store: Store<AppState>) {
    this.user = store.select('session');
  }

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
      let dataJson = JSON.parse(JSON.stringify(data));
      this.apiService.setTokenData(dataJson.access_token, dataJson.refresh_token, dataJson.expires_in, dataJson.token_type);
      console.log(window.sessionStorage.getItem('token'));

      this.apiService.getCurrentUsername().subscribe(username => {
        console.log(username);
      }, error => {
          alert(error.error.error_description);
      });

      this.router.navigate(['home']);
    }, error => {
        alert(error.error.error_description);
    });
  }

  ngOnInit() {
    window.sessionStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }


}
