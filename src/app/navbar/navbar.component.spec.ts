import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import * as AuthActions from '../common/state/auth/auth.actions';
import {NavbarComponent} from './navbar.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj(Store, ['select', 'dispatch']);
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{provide: Store, useValue: mockStore}],
    }).compileComponents();

    mockStore.select.and.returnValue({
      subscribe: () => ({
        unsubscribe: (): void => {
          return;
        },
      }),
    });

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to login changes', () => {
    expect(mockStore.select).toHaveBeenCalled();
  });

  it('should logout via the store', () => {
    component.handleLogout();
    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthActions.logout());
  });
});
