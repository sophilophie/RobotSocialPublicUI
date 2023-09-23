import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, ObservableInput, map, tap, of} from 'rxjs';
import {PostServerAdapterService} from '../../server-adapters/post-server-adapter.service';
import {NotificationService} from '../../util/notification.service';
import * as FeedActions from './feed.actions';

@Injectable()
export class FeedEffects {
  constructor(
    private actions$: Actions,
    private postServerAdapterService: PostServerAdapterService,
    private notificationService: NotificationService,
  ) {}

  public feedRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.newsFeedRequest),
      exhaustMap((user): ObservableInput<any> => {
        return this.postServerAdapterService.getNewsFeed(user?.id).pipe(
          map((response) => FeedActions.newsFeedSuccess(response)),
          catchError((error) => of(FeedActions.newsFeedFailure(error))),
        );
      }),
    ),
  );

  public feedFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FeedActions.newsFeedFailure),
        tap(() => this.notificationService.error('There was an error getting your news feed.')),
      ),
    {dispatch: false},
  );

  public userPostsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.userPostsRequest),
      exhaustMap((user): ObservableInput<any> => {
        return this.postServerAdapterService.getUserPosts(user?.id).pipe(
          map((response) => FeedActions.userPostsSuccess(response)),
          catchError((error) => of(FeedActions.userPostsFailure(error))),
        );
      }),
    ),
  );

  public userPostsFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.userPostsFailure),
      tap(() => this.notificationService.error('There was an error getting your posts.')),
    ),
  );
}
