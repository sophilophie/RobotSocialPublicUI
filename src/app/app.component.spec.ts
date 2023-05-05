import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Store} from '@ngrx/store';
import {AppComponent} from './app.component';
import * as AuthActions from './common/state/auth/auth.actions';

describe('AppComponent', () => {
  let mockStore: Store;
  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('store', ['dispatch']);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{provide: Store, useValue: mockStore}],
    }).compileComponents();
  });

  function initComponent() {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return {fixture, component};
  }

  it('should create the app', () => {
    const {component} = initComponent();
    expect(component instanceof AppComponent).toBe(true);
  });

  it('should not attempt a login on init if localStorage has no token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    initComponent();
    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it('should attempt a login on init if localStorage has a token', () => {
    spyOn(localStorage, 'getItem').and.returnValue('TEST_TOKEN');
    initComponent();
    expect(mockStore.dispatch).toHaveBeenCalledOnceWith(AuthActions.refreshRequest({access_token: 'TEST_TOKEN'}));
  });
});
