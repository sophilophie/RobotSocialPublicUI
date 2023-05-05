import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {LoginDto} from '../common/types/user';
import {NotificationService} from '../common/util/notification.service';
import * as AuthActions from '../common/state/auth/auth.actions';

@Component({
  selector: 'rspui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public hidePass = true;
  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private store: Store,
  ) {}

  public usernameControl = new FormControl('', [Validators.required]);
  public passwordControl = new FormControl('', [Validators.required]);

  public loginData = this.formBuilder.group({
    username: this.usernameControl,
    password: this.passwordControl,
  });

  public handleLoginSubmit(): void {
    if (this.loginData.valid) {
      this.store.dispatch(AuthActions.loginRequest(this.loginData.value as LoginDto));
    } else {
      this.notificationService.warn('Please enter your credentials!');
    }
  }

  public toggleHidePass(): void {
    this.hidePass = !this.hidePass;
  }
}
