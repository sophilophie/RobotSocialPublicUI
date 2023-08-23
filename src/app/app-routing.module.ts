import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SignupComponent} from './login/signup/signup.component';
import {LoginComponent} from './login/login.component';
import {canActivateAppGuardFunction} from './common/guards/can-load-app.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [canActivateAppGuardFunction]},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
