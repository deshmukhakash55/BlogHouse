import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';
import { Observable, Subject } from 'rxjs';
import { observe } from 'rxjs-observe';
import { delay } from 'q';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() parentName: string;
  searchForm: FormGroup;
  profilePic: any;

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private sanitization: DomSanitizer, private loginService: LoginService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchText: ['', Validators.compose([Validators.required])]
    });
    this.loadProfilePic();
  }

  onSearch() {
    const searchText = this.searchForm.controls.searchText.value;
    this.router.navigate(['search/' + searchText]);
  }

  loadProfilePic() {
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    const base64 = user.profile_pic;
    if ( base64 === null || base64 === undefined || base64 === '') {
      delay(1000);
      this.loadProfilePic();
    } else {
      console.log('setting bgimg as ' + 'url(\'data:image/jpeg;base64,' + base64 + '\')');
      this.profilePic = this.sanitization.bypassSecurityTrustStyle('url(\'data:image/jpeg;base64,' + base64 + '\')');
    }
  }

  logOut() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('username');
    window.sessionStorage.removeItem('user');
    this.loginService.loginAndTokenCheck('home');
  }

}
