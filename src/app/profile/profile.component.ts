import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../common/state/auth/auth.reducer';
import {Observable, Subscription} from 'rxjs';
import {AppState} from '../common/state/state';
import {User} from '../common/types/user';
import {MatDialog} from '@angular/material/dialog';
import * as _ from 'lodash';
import {EditProfileDialogComponent} from './edit-profile-dialog/edit-profile-dialog.component';
import {getPostTimeText} from '../common/util/snippets/time-transformations';
import {Post} from '../common/types/post';
import {FeedState} from '../common/state/feed/feed.reducer';

@Component({
  selector: 'rspui-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnDestroy, OnInit {
  public user: User | null = null;
  public posts: Post[] | null = [];

  private authState$: Observable<AuthState> = this.store.select((state: AppState | object) => (state as AppState).auth);
  private feedState$: Observable<FeedState> = this.store.select((state: AppState | object) => (state as AppState).feed);
  private subscriptions: Subscription[] = [];

  constructor(private store: Store, private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authState$.subscribe((authState) => {
        this.user = authState.user;
      }),
      this.feedState$.subscribe((feedState) => {
        this.posts = feedState.userPosts;
      }),
    );
  }

  public ngOnDestroy(): void {
    _.forEach(this.subscriptions, (sub) => sub.unsubscribe());
  }

  public openEditDialog(): void {
    this.dialog.open(EditProfileDialogComponent, {data: {user: this.user}});
  }

  public getPostTimeText(timeString: Date): string {
    return getPostTimeText(timeString);
  }
}
