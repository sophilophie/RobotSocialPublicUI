import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './route-outlets/home/home.component';
import {SignupComponent} from './login/signup/signup.component';
import {LoginComponent} from './login/login.component';
import {canActivateAppGuardFunction} from './common/guards/can-load-app.guard';
import {ProfileComponent} from './route-outlets/profile/profile.component';
import {SearchComponent} from './route-outlets/search/search.component';
import {FriendsComponent} from './route-outlets/friends/friends.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [canActivateAppGuardFunction]},
  {path: 'profile', component: ProfileComponent, canActivate: [canActivateAppGuardFunction]},
  {path: 'search', component: SearchComponent, canActivate: [canActivateAppGuardFunction]},
  {path: 'friends', component: FriendsComponent, canActivate: [canActivateAppGuardFunction]},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
