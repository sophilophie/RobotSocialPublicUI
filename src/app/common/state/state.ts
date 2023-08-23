import {AuthState} from './auth/auth.reducer';
import {FeedState} from './feed/feed.reducer';

export interface AppState {
  auth: AuthState;
  feed: FeedState;
}
