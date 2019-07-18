import { Component, OnInit } from '@angular/core';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(window.sessionStorage.getItem('user'));
    this.firstName = this.user.first_name;
    this.lastName = this.user.last_name;
    this.email = this.user.email;
    this.mobile = this.user.mobile;
  }

  editEnable(event: any) {
  }

}
