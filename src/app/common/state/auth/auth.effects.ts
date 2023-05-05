import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, ObservableInput, map, tap, of} from 'rxjs';
import {UserServerAdapterService} from '../../server-adapters/user-server-adapter.service';
import {NotificationService} from '../../util/notification.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private userServerAdapterService: UserServerAdapterService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  public loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action): ObservableInput<any> => {
        return this.userServerAdapterService.postSession(action).pipe(
          map((response) => AuthActions.loginSuccess(response)),
          catchError((error) => of(AuthActions.loginFailure(error))),
        );
      }),
    ),
  );

  public loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((response) => {
          localStorage.setItem('access_token', response.access_token as string);
          this.notificationService.success('Login Successful!');
        }),
      ),
    {dispatch: false},
  );

  public loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(() => {
          this.notificationService.error('Invalid username or password!');
        }),
      ),
    {dispatch: false},
  );

  public refreshRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshRequest),
      exhaustMap((action): ObservableInput<any> => {
        return this.userServerAdapterService.postRefreshSession(action).pipe(
          map((response) => AuthActions.refreshSuccess(response)),
          catchError((error) => of(AuthActions.refreshFailure(error))),
        );
      }),
    ),
  );

  public refreshSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.refreshSuccess),
        tap((response) => {
          localStorage.setItem('access_token', response.access_token as string);
          this.notificationService.success('Welcome Back!');
        }),
      ),
    {dispatch: false},
  );

  public refreshFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.refreshFailure),
        tap(() => {
          this.notificationService.error('Something went wrong. Please log in again.');
        }),
      ),
    {dispatch: false},
  );

  public signupRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupRequest),
      exhaustMap((user): ObservableInput<any> => {
        return this.userServerAdapterService.postUser(user).pipe(
          map((response) => AuthActions.signupSuccess(response)),
          catchError((error) => of(AuthActions.signupFailure(error))),
        );
      }),
    ),
  );

  public signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap((response) => {
          localStorage.setItem('access_token', response.access_token as string);
          this.router.navigate(['/']);
          this.notificationService.success('Login Successful!');
        }),
      ),
    {dispatch: false},
  );

  public signupFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupFailure),
        tap((response: any) => {
          if (response.status === 409) {
            return this.notificationService.error('Username or email has been taken');
          }
          this.notificationService.error('Something went wrong. Please try again.');
        }),
      ),
    {dispatch: false},
  );
}
