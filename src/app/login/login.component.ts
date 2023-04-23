import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserServerAdapterService } from '../common/server-adapters/user-server-adapter.service';
import { LoginDto, Token } from '../common/types/user';
import { NotificationService } from '../common/util/notification.service';

@Component({
  selector: 'rspui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hidePass: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private userServerAdapterService: UserServerAdapterService,
    private notificationService: NotificationService
  ) {}

  public usernameControl = new FormControl('', [Validators.required]);
  public passwordControl = new FormControl('', [Validators.required]);

  public loginData = this.formBuilder.group({
    username: this.usernameControl,
    password: this.passwordControl
  });

  handleLoginSubmit() {
    if (this.loginData.valid) {
      this.userServerAdapterService.postSession(this.loginData.value as LoginDto).subscribe({
        next: (tokenObj: Token) => {
          localStorage.setItem('access_token', tokenObj.access_token);
          this.notificationService.success('Login Success!');
        },
        error: (err) => {
          console.error(err);
          this.notificationService.error('Something went wrong!');
        }
      });
    } else {
      this.notificationService.warn('Please enter your credentials!');
    }
  }
}
