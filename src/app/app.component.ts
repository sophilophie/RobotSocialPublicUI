import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as AuthActions from './common/state/auth/auth.actions';
import {Observable, Subscription} from 'rxjs';
import {AuthState} from './common/state/auth/auth.reducer';
import {AppState} from './common/state/state';
import {User} from './common/types/user';

@Component({
  selector: 'rspui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  constructor(private store: Store) {}

  public isLoggedIn = false;
  public user: User | null = null;
  private authState$: Observable<AuthState> = this.store.select((state: AppState | object) => (state as AppState).auth);
  private subscription: Subscription | undefined;

  public ngOnInit(): void {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.store.dispatch(AuthActions.refreshRequest({access_token: accessToken}));
    }
    this.subscription = this.authState$.subscribe((authState: AuthState) => {
      this.isLoggedIn = authState.isLoggedIn;
      this.user = authState.user;
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
