import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, ObservableInput, map, tap, of, concatMap, forkJoin} from 'rxjs';
import {UserServerAdapterService} from '../../server-adapters/user-server-adapter.service';
import {NotificationService} from '../../util/notification.service';
import {PostServerAdapterService} from '../../server-adapters/post-server-adapter.service';
import * as AuthActions from './auth.actions';
import * as FeedActions from '../feed/feed.actions';

@Injectable({providedIn: 'root'})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private userServerAdapterService: UserServerAdapterService,
    private postServerAdapterService: PostServerAdapterService,
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

  public loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap((response) => {
        localStorage.setItem('access_token', response.access_token as string);
        this.router.navigate(['/']);
        this.notificationService.success('Login Successful!');
      }),
      concatMap((response) => [
        FeedActions.newsFeedRequest(response?.user),
        FeedActions.userPostsRequest(response?.user),
      ]),
    ),
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

  public logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('access_token');
          this.router.navigate(['/login']);
          this.notificationService.success('Successfully logged out!');
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

  public refreshSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshSuccess),
      tap((response) => {
        localStorage.setItem('access_token', response.access_token as string);
        if (this.router.url === '/login' || this.router.url === '/sign-up') this.router.navigate(['/']);
        this.notificationService.success('Welcome Back!');
      }),
      concatMap((response) => [
        FeedActions.newsFeedRequest(response?.user),
        FeedActions.userPostsRequest(response?.user),
      ]),
    ),
  );

  public refreshFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.refreshFailure),
        tap(() => {
          this.router.navigate(['/login']);
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

  public updateUserRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUserRequest),
      exhaustMap((user): ObservableInput<any> => {
        return this.userServerAdapterService.putUser(user, user.id as number).pipe(
          map((response) => AuthActions.updateUserSuccess(response)),
          catchError((error) => of(AuthActions.updateUserFailure(error))),
        );
      }),
    ),
  );

  public updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateUserSuccess),
        tap(() => this.notificationService.success('User Updated!')),
      ),
    {dispatch: false},
  );

  public updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateUserFailure),
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
