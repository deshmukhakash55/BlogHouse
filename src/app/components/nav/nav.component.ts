import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchText: ['', Validators.compose([Validators.required])]
    });
  }

  onSearch() {
    const searchText = this.searchForm.controls.searchText.value;
    this.router.navigate(['search/' + searchText]);
  }

}
