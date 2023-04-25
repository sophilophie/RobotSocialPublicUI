import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthState } from '../common/state/auth/auth.reducer';
import { AppState } from '../common/state/state';
import { User } from '../common/types/user';

@Component({
  selector: 'rspui-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;

  isLoggedIn: boolean = false;
  user: User | null = null;

  authState$: Observable<AuthState> = this.store.select((state: AppState | {}) => (state as AppState).auth);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.authState$.subscribe((authState: AuthState) => {
      this.user = authState.user;
      this.isLoggedIn = authState.isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
