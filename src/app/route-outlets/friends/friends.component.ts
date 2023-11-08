import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {AuthState} from '../../common/state/auth/auth.reducer';
import {AppState} from '../../common/state/state';
import {FriendRequest, User} from '../../common/types/user';
import * as moment from 'moment';
import {UserServerAdapterService} from 'src/app/common/server-adapters/user-server-adapter.service';
import * as AuthActions from '../../common/state/auth/auth.actions';
import * as FeedActions from '../../common/state/feed/feed.actions';
import {NotificationService} from 'src/app/common/util/notification.service';
import * as _ from 'lodash';

@Component({
  selector: 'rspui-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnDestroy, OnInit {
  public user: User | null = null;
  private subscriptions: Subscription[] = [];
  private authState$: Observable<AuthState> = this.store.select((state: AppState | object) => (state as AppState).auth);

  constructor(
    private store: Store,
    private userServerAdapter: UserServerAdapterService,
    private notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authState$.subscribe((authState) => {
        this.user = authState.user;
      }),
    );
  }

  public ngOnDestroy(): void {
    _.forEach(this.subscriptions, (sub) => sub?.unsubscribe());
  }

  public acceptFriendRequest(request: FriendRequest): void {
    if (request.requestor.id) {
      this.userServerAdapter
        .postFriendship({requestorId: request.requestor.id, requesteeId: this.user?.id as string})
        .subscribe({
          next: (friendship) => {
            this.store.dispatch(AuthActions.updateFriendships(friendship));
            if (this.user) this.store.dispatch(FeedActions.newsFeedRequest(this.user));
            this.store.dispatch(AuthActions.removeReceivedFriendRequest(request));
            this.notificationService.success('Added friend successfully!');
          },
          error: () => {
            this.notificationService.error('Something went wrong!');
          },
        });
    } else {
      this.notificationService.error('Something went wrong!');
    }
  }

  public formatDate(date: any | undefined): string {
    return moment(new Date(date)).format('MMMM DD YYYY');
  }
}
