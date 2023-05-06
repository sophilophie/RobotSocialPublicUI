import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import * as AuthActions from '../common/state/auth/auth.actions';
import {AuthState} from '../common/state/auth/auth.reducer';
import {AppState} from '../common/state/state';

@Component({
  selector: 'rspui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  private authState$: Observable<AuthState> = this.store.select((state: AppState | object) => (state as AppState).auth);
  public isLoggedIn = false;
  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.subscription = this.authState$.subscribe((authState) => {
      this.isLoggedIn = authState.isLoggedIn;
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public handleLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
