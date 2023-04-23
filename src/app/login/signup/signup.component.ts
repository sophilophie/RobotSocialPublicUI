import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CustomValidators } from 'src/app/common/custom.validators';
import { UserServerAdapterService } from 'src/app/common/server-adapters/user-server-adapter.service';
import { User } from 'src/app/common/types/user';

@Component({
  selector: 'rspui-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy, OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userServerAdapterService: UserServerAdapterService,
    private matSnackBar: MatSnackBar
  ) { }

  private subscription: Subscription | null = null;

  public hidePass: boolean = true;
  public doPasswordsMatch: boolean = true;
  public firstNameFormControl = new FormControl('', [Validators.required]);
  public lastNameFormControl = new FormControl('', [Validators.required]);
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public usernameFormControl = new FormControl('',
    [Validators.required, Validators.maxLength(32), Validators.minLength(8)]);
  public passwordFormControl = new FormControl('',
    [Validators.required, Validators.maxLength(32), Validators.minLength(8),
    CustomValidators.match('confirmPassword', true)]);
  public confirmPasswordFormControl = new FormControl('', 
    [Validators.required, Validators.maxLength(32), Validators.minLength(8),
    CustomValidators.match('password')]);

  public signupData = this.formBuilder.group({
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    username: this.usernameFormControl,
    email: this.emailFormControl,
    password: this.passwordFormControl,
    confirmPassword: this.confirmPasswordFormControl
  });

  ngOnInit(): void {
    this.subscription = this.signupData.controls.password.valueChanges.subscribe(() => {
      this.signupData.controls.confirmPassword.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public handleSubmit(): void {
    if (this.signupData.valid) {
      this.userServerAdapterService.postUser(this.signupData.value as User).subscribe({
        next: (user) => {
          console.log(user);
          this.matSnackBar.open('Signup Success!', '', {
            horizontalPosition: 'left',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: 'snackbar-success'
          });
        },
        error: (err) => {
          console.error(err);
          this.matSnackBar.open('Something went wrong!', '', {
            horizontalPosition: 'left',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: 'snackbar-error'
          })
        }
      });
    }
  }
}
