import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchresultsComponent } from './components/searchresults/searchresults.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { FollowComponent } from './components/follow/follow.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.service';
import { LoginService } from './services/login.service';
import { BlogService } from './services/blog.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContentComponent,
    FooterComponent,
    SearchresultsComponent,
    UserprofileComponent,
    FollowComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    LoginService,
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
