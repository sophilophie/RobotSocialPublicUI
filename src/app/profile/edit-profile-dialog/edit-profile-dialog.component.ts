import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {User} from 'src/app/common/types/user';
import * as AuthActions from '../../common/state/auth/auth.actions';
import {AuthEffects} from 'src/app/common/state/auth/auth.effects';
import {take} from 'rxjs';
import {NotificationService} from 'src/app/common/util/notification.service';

export interface DialogData {
  user: User;
}

@Component({
  selector: 'rspui-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss'],
})
export class EditProfileDialogComponent implements OnInit {
  public firstNameFormControl = new FormControl('', [Validators.required]);
  public lastNameFormControl = new FormControl('', [Validators.required]);
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(32),
    Validators.minLength(8),
  ]);
  public profileData: FormGroup = this.formBuilder.group({
    firstName: this.firstNameFormControl,
    lastName: this.lastNameFormControl,
    username: this.usernameFormControl,
    email: this.emailFormControl,
  });

  constructor(
    private dialogRef: MatDialogRef<EditProfileDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private authEffects: AuthEffects,
    private store: Store,
    private notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this.firstNameFormControl.setValue(this.data.user.firstName);
    this.lastNameFormControl.setValue(this.data.user.lastName);
    this.emailFormControl.setValue(this.data.user.email);
    this.usernameFormControl.setValue(this.data.user.username);
  }

  public onEditCancelled(): void {
    this.dialogRef.close();
  }

  public onEditSubmitted(): void {
    if (this.profileData.valid) {
      this.authEffects.updateUserSuccess$.pipe(take(1)).subscribe(() => {
        this.dialogRef.close();
      });
      const changedUser = this.profileData.value;
      changedUser.id = this.data.user.id;
      this.store.dispatch(AuthActions.updateUserRequest(changedUser));
    } else {
      this.notificationService.warn('Cannot update user! Fields have errors.');
    }
  }
}
