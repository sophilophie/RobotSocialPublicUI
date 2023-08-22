import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {AuthState} from '../common/state/auth/auth.reducer';
import {AppState} from '../common/state/state';
import {User} from '../common/types/user';
import {FeedState} from '../common/state/feed/feed.reducer';
import {Post} from '../common/types/post';
import {PostServerAdapterService} from '../common/server-adapters/post-server-adapter.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as FeedActions from '../common/state/feed/feed.actions';

@Component({
  selector: 'rspui-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy, OnInit {
  @ViewChild('postInput') public postInput: ElementRef | undefined;

  private subscriptions: Subscription[] = [];

  public isLoggedIn = !!localStorage.getItem('access_token');
  public user: User | null = null;
  public newsFeed: Post[] | null = [];

  private authState$: Observable<AuthState> = this.store.select((state: AppState | object) => (state as AppState).auth);
  private feedState$: Observable<FeedState> = this.store.select((state: AppState | object) => (state as AppState).feed);

  constructor(private store: Store, private postServerAdapterService: PostServerAdapterService) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authState$.subscribe((authState: AuthState) => {
        this.user = authState.user;
        this.isLoggedIn = authState.isLoggedIn;
      }),
      this.feedState$.subscribe((feedState: FeedState) => {
        this.newsFeed = feedState?.feed;
      }),
    );
  }

  public ngOnDestroy(): void {
    _.forEach(this.subscriptions, (sub) => sub?.unsubscribe());
  }

  public getPostTimeText(timeString: Date): string {
    timeString = new Date(timeString);
    return moment(timeString).format('dddd MMMM DD YYYY hh:mm a');
  }

  public createPost(): void {
    const postDto = {
      content: this.postInput?.nativeElement.value,
      userId: this.user?.id,
    };
    this.postServerAdapterService.postNewPost(postDto).subscribe(() => {
      if (this.user) this.store.dispatch(FeedActions.newsFeedRequest(this.user));
    });
  }
}
