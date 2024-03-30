import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserServerAdapterService} from '../../common/server-adapters/user-server-adapter.service';
import {Friendship, User} from '../../common/types/user';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AuthState} from '../../common/state/auth/auth.reducer';
import {AppState} from '../../common/state/state';
import {NotificationService} from '../../common/util/notification.service';
import * as AuthActions from '../../common/state/auth/auth.actions';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'rspui-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy, OnInit {
  @ViewChild('searchInput') public searchInput: ElementRef | undefined;

  public searchResults: User[] = [];

  private authState$: Observable<AuthState> = this.store.select((state: AppState | object) => (state as AppState).auth);
  private user: User | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private userServerAdapter: UserServerAdapterService,
    private store: Store,
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

  public executeSearch(event?: Event): void {
    event?.preventDefault();
    if (this.searchInput?.nativeElement.value && this.user?.id) {
      this.userServerAdapter.getSearchedUsers(this.searchInput?.nativeElement.value, this.user?.id).subscribe({
        next: (searchResults: User[]) => {
          this.searchResults = searchResults;
        },
        error: () => {
          this.notificationService.error('Something went wrong!');
        },
      });
    } else {
      this.searchResults = [];
    }
  }
  public evaluateHeight(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.searchInput!.nativeElement.style.height = 'auto';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.searchInput!.nativeElement.style.height = `${this.searchInput?.nativeElement.scrollHeight}px`;
  }

  public clearSearch(): void {
    this.searchResults = [];
  }

  public sendFriendRequest(requesteeId?: string): void {
    if (this.user && requesteeId) {
      this.userServerAdapter.postFriendRequest({requesteeId, requestorId: this.user.id as string}).subscribe({
        next: (friendRequest) => {
          this.store.dispatch(AuthActions.updateSentFriendRequests(friendRequest));
          this.notificationService.success('Friend request sent!');
        },
        error: () => {
          this.notificationService.error('Something went wrong!');
        },
      });
    } else {
      this.notificationService.error('Something went wrong!');
    }
  }

  public isFriend(person: User): boolean {
    return (
      _.some(this.user?.friendships, (friendship) => person.id === friendship.friend.id) || person.id === this.user?.id
    );
  }

  public isFriendRequested(person: User): boolean {
    return _.some(this.user?.requestedFriends, (friendRequest) => friendRequest.requestee.id === person.id);
  }

  public isRequestingFriendship(person: User): boolean {
    return _.some(this.user?.requestsReceived, (friendRequest) => friendRequest.requestor.id === person.id);
  }

  public getFriendshipDate(person: User): string {
    const friendship: Friendship | undefined = this.user?.friendships?.find(
      (friendship) => friendship.friend.id === person.id,
    );
    return moment(friendship?.dateCreated).format('MMMM DD YYYY');
  }
}
