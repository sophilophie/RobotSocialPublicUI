import {Component, OnDestroy, OnInit, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import * as AuthActions from './common/state/auth/auth.actions';
import {Observable, Subscription, filter, take, tap} from 'rxjs';
import {AuthState} from './common/state/auth/auth.reducer';
import {AppState} from './common/state/state';
import {User} from './common/types/user';
import {Router} from '@angular/router';
import {LoadingOverlayService} from './common/util/loading-overlay/loading-overlay.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'rspui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  constructor(
    private store: Store,
    private router: Router,
    private loadingOverlayService: LoadingOverlayService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  public isLoggedIn = false;
  public user: User | null = null;
  private authState$: Observable<AuthState> = this.store.select((state: AppState | object) => (state as AppState).auth);
  private subscription: Subscription | undefined;

  public ngOnInit(): void {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.store.dispatch(AuthActions.refreshRequest({access_token: accessToken}));
    } else {
      if (!window.location.pathname.includes('/sign-up')) this.router.navigate(['/login']);
    }
    this.subscription = this.authState$.subscribe((authState: AuthState) => {
      this.isLoggedIn = authState.isLoggedIn;
      this.user = authState.user;
    });
    this.loadingOverlayService.isLoading$
      .pipe(
        filter((isLoading) => !isLoading),
        take(1),
      )
      .subscribe(() => this.document.getElementById('rspui-root-loading')?.remove());
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
