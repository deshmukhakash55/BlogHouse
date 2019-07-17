import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.loginService.loginAndTokenCheck('follow');
  }

}
