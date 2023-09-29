import {TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

import {EditProfileDialogComponent} from './edit-profile-dialog.component';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthEffects} from 'src/app/common/state/auth/auth.effects';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {NotificationService} from 'src/app/common/util/notification.service';

describe('EditProfileDialogComponent', () => {
  let mockDialog: any, mockData: any, mockAuthEffects: any, mockStore: any, mockNotificationService: any;
  let component: any;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('dialogRef', ['close']);
    mockData = {user: {}};
    mockAuthEffects = {updateUserSuccess$: new Subject()};
    mockStore = jasmine.createSpyObj('store', ['dispatch']);
    mockNotificationService = jasmine.createSpyObj('notificationService', ['warn']);
    await TestBed.configureTestingModule({
      declarations: [EditProfileDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {provide: MatDialogRef, useValue: mockDialog},
        {provide: MAT_DIALOG_DATA, useValue: mockData},
        {provide: AuthEffects, useValue: mockAuthEffects},
        {provide: Store, useValue: mockStore},
        {provide: NotificationService, useValue: mockNotificationService},
      ],
    }).compileComponents();

    component = TestBed.createComponent(EditProfileDialogComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when cancelled', () => {
    component.onEditCancelled();
    expect(mockDialog.close).toHaveBeenCalled();
  });

  it('should show notification and not close the dialog on submit if the form is invalid', () => {
    component.firstNameFormControl.setValue('');
    component.onEditSubmitted();
    expect(mockDialog.close).not.toHaveBeenCalled();
    expect(mockNotificationService.warn).toHaveBeenCalled();
  });

  it('should close modal and dispatch an action on submit if successful', () => {
    component.firstNameFormControl.setValue('Test');
    component.lastNameFormControl.setValue('Test');
    component.emailFormControl.setValue('Test@test.com');
    component.usernameFormControl.setValue('Username');
    component.onEditSubmitted();
    expect(mockStore.dispatch).toHaveBeenCalled();
    mockAuthEffects.updateUserSuccess$.next();
    expect(mockDialog.close).toHaveBeenCalled();
  });
});
