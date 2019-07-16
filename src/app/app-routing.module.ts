import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FollowComponent } from './components/follow/follow.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchresultsComponent } from './components/searchresults/searchresults.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { ContentComponent } from './components/content/content.component';


const routes: Routes = [
  {path : '', component: LoginComponent},
  {path : 'home', component: HomeComponent},
  {path : 'follow', component: FollowComponent},
  {path : 'profile', component: ProfileComponent},
  {path : 'search/:text', component: SearchresultsComponent},
  {path : 'userprofile', component: UserprofileComponent},
  {path : 'content', component: ContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
