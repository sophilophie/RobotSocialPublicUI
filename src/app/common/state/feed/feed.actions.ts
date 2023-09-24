import {createAction, props} from '@ngrx/store';
import {FeedResponse, PostsResponse} from '../../types/post';
import {User} from '../../types/user';

export const newsFeedRequest = createAction('[FEED] News Feed Request', props<User>());

export const newsFeedSuccess = createAction('[FEED] News Feed Success', props<FeedResponse>());

export const newsFeedFailure = createAction('[FEED] News Feed Failure', props<FeedResponse>());

export const userPostsRequest = createAction('[FEED] User Posts Request', props<User>());

export const userPostsSuccess = createAction('[FEED] User Posts Success', props<PostsResponse>());

export const userPostsFailure = createAction('[Feed] User Posts Failure', props<PostsResponse>());

export const clearFeed = createAction('[FEED] Clear Feed');
