import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { User } from 'src/app/common/types/user';
import { NotificationService } from 'src/app/common/util/notification.service';
import * as AuthActions from '../../common/state/auth/auth.actions';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  let mockStore: any, mockNotificationService: any;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('store', ['dispatch']);
    mockNotificationService = jasmine.createSpyObj('notificationService', ['warn']);
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [
        {provide: Store, useValue: mockStore},
        {provide: NotificationService, useValue: mockNotificationService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if errors are present', () => {
    component.handleSubmit();
    expect(mockStore.dispatch).not.toHaveBeenCalled();
    expect(mockNotificationService.warn).toHaveBeenCalledOnceWith('Please fix any errors to continue signing up!');
  });

  it('should dispatch an event if the form is valid', () => {
    component.signupData.controls.firstName.setValue('first');
    component.signupData.controls.lastName.setValue('last');
    component.signupData.controls.email.setValue('test@test.com');
    component.signupData.controls.username.setValue('uTestUsername');
    component.signupData.controls.password.setValue('testPassword');
    component.signupData.controls.confirmPassword.setValue('testPassword');
    component.handleSubmit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.signupRequest(component.signupData.value as User));
  });
});
