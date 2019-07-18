import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  constructor(public loginService: LoginService, public userService: UserService, public apiService: ApiService) { }

  ngOnInit() {
    this.loginService.loginAndTokenCheck('home');
    this.apiService.getCurrentUsername().subscribe( (username: any) => {
      username = JSON.parse(JSON.stringify(username)).username;
      window.sessionStorage.setItem('username', username.toString());
      this.userService.searchUserByUsername().subscribe( (data: any) => {
        window.sessionStorage.setItem('user', JSON.stringify(data[0]));
      });
    });
  }

}
