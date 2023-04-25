import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { NotificationService } from '../common/util/notification.service';
import { LoginComponent } from './login.component';
import * as AuthActions from '../common/state/auth/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockStore: Store, mockNotificationService: NotificationService;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('store', ['dispatch']);
    mockNotificationService = jasmine.createSpyObj('notificationService', ['warn']);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {provide: Store, useValue: mockStore},
        {provide: NotificationService, useValue: mockNotificationService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should warn users if login form is invalid', () => {
    component.handleLoginSubmit();
    expect(mockStore.dispatch).not.toHaveBeenCalled();
    expect(mockNotificationService.warn).toHaveBeenCalledOnceWith('Please enter your credentials!');
  });

  it('should dispatch an event if form is valid', () => {
    component.loginData.controls.username.setValue('Test');
    component.loginData.controls.password.setValue('Password');
    expect(component.loginData.valid).toBe(true);
    component.handleLoginSubmit();
    expect(mockStore.dispatch).toHaveBeenCalledOnceWith(AuthActions.loginRequest({username: 'Test', password: 'Password'}));
  });
});
