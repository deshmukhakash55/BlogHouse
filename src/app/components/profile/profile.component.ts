import { Component, OnInit } from '@angular/core';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { UserService } from '../../services/user.service';
import { formatDate } from '@angular/common';
import { ApiService } from '../../services/api.service';

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
  profilePic: string;
  firstNameInput: boolean;
  firstNameButton: boolean;
  lastNameInput: boolean;
  lastNameButton: boolean;
  descriptionInput: boolean;
  descriptionButton: boolean;
  submitButtonDisabled: boolean;

  constructor(private userService: UserService, private apiService: ApiService) { }

  ngOnInit() {
    this.user = JSON.parse(window.sessionStorage.getItem('user'));
    this.firstName = this.user.first_name;
    this.lastName = this.user.last_name;
    this.email = this.user.email;
    this.mobile = this.user.mobile;
    this.profilePic = 'data:image/jpeg;base64,' + this.user.profile_pic;
    this.firstNameInput = true;
    this.firstNameButton = false;
    this.lastNameInput = true;
    this.lastNameButton = false;
    this.descriptionInput = true;
    this.descriptionButton = false;
    this.submitButtonDisabled = true;
  }

  buttonClicked(event: any, inputType: string) {
    console.log(inputType);
    if(inputType === 'firstName') {
      this.firstNameButton = true;
      this.firstNameInput = false;
    }
    if(inputType === 'lastName') {
      this.lastNameButton = true;
      this.lastNameInput = false;
    }
    if(inputType === 'description') {
      this.descriptionButton = true;
      this.descriptionInput = false;
    }

    this.submitButtonDisabled = false;

  }

  submitUpdatedProfile() {
    var flg = false;
    if(this.user.first_name != this.firstName){
      flg = true;
      this.user.first_name = this.firstName;
    }
    if(this.user.last_name != this.lastName){
      flg = true;
      this.user.last_name = this.lastName;
    }
    if(flg)
    {
      var timestamp = new Date(this.user.creation_time);
      var date = formatDate(timestamp.toISOString(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
      this.user.creation_time = date.toString();
      this.userService.updateUser(this.user).subscribe((response: any) => {
        this.firstName = this.user.first_name;
        this.lastName = this.user.last_name;
        this.email = this.user.email;
        this.mobile = this.user.mobile;
        this.firstNameInput = true;
        this.firstNameButton = false;
        this.lastNameInput = true;
        this.lastNameButton = false;
        this.descriptionInput = true;
        this.descriptionButton = false;
        this.submitButtonDisabled = true;
        window.sessionStorage.setItem('user', JSON.stringify(this.user));
      });
    }
  }

}
