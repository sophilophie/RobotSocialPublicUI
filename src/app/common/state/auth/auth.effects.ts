import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, ObservableInput, map, tap, of, concatMap, forkJoin, mergeMap} from 'rxjs';
import {UserServerAdapterService} from '../../server-adapters/user-server-adapter.service';
import {NotificationService} from '../../util/notification.service';
import * as AuthActions from './auth.actions';
import * as FeedActions from '../feed/feed.actions';
import {LoadingOverlayService} from '../../util/loading-overlay/loading-overlay.service';

@Injectable({providedIn: 'root'})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private userServerAdapterService: UserServerAdapterService,
    private notificationService: NotificationService,
    private router: Router,
    private loadingOverlayService: LoadingOverlayService,
  ) {}

  public loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      map((action) => ({username: action.username, password: action.password})),
      exhaustMap((request): ObservableInput<any> => {
        this.loadingOverlayService.isLoading$.next(true);
        return this.userServerAdapterService.postSession(request).pipe(
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
      mergeMap((response) => [
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
          this.loadingOverlayService.isLoading$.next(false);
        }),
      ),
    {dispatch: false},
  );

  public logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
        this.notificationService.success('Successfully logged out!');
      }),
      mergeMap(() => [FeedActions.clearFeed()]),
    ),
  );

  public refreshRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshRequest),
      map((action) => ({access_token: action.access_token})),
      exhaustMap((request): ObservableInput<any> => {
        this.loadingOverlayService.isLoading$.next(true);
        return this.userServerAdapterService.postRefreshSession(request).pipe(
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
      mergeMap((response) => [
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
          localStorage.removeItem('access_token');
          this.router.navigate(['/login']);
          this.notificationService.error('Something went wrong. Please log in again.');
          this.loadingOverlayService.isLoading$.next(false);
        }),
      ),
    {dispatch: false},
  );

  public signupRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupRequest),
      exhaustMap((user): ObservableInput<any> => {
        this.loadingOverlayService.isLoading$.next(true);
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
          this.loadingOverlayService.isLoading$.next(false);
        }),
      ),
    {dispatch: false},
  );

  public signupFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupFailure),
        tap((response: any) => {
          this.loadingOverlayService.isLoading$.next(false);
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
        this.loadingOverlayService.isLoading$.next(true);
        return this.userServerAdapterService.putUser(user, user.id as string).pipe(
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
        tap(() => {
          this.notificationService.success('User Updated!');
          this.loadingOverlayService.isLoading$.next(false);
        }),
      ),
    {dispatch: false},
  );

  public updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateUserFailure),
        tap((response: any) => {
          this.loadingOverlayService.isLoading$.next(false);
          if (response.status === 409) {
            return this.notificationService.error('Username or email has been taken');
          }
          this.notificationService.error('Something went wrong. Please try again.');
        }),
      ),
    {dispatch: false},
  );
}
