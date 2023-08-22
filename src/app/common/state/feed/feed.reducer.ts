import * as FeedActions from './feed.actions';
import {createReducer, on} from '@ngrx/store';
import {Post} from '../../types/post';

export interface FeedState {
  feed: Post[] | null;
  userPosts: Post[] | null;
}

export const initialState: FeedState = {
  feed: [],
  userPosts: [],
};

export const feedReducer = createReducer(
  initialState,
  on(FeedActions.newsFeedSuccess, (state, newsFeed) => {
    return {
      ...state,
      feed: newsFeed.feed,
    };
  }),
  on(FeedActions.newsFeedFailure, (state) => {
    return {
      ...state,
      feed: [],
    };
  }),
);
