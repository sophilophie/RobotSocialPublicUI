import {createAction, props} from '@ngrx/store';
import {FeedResponse} from '../../types/post';
import {User} from '../../types/user';

export const newsFeedRequest = createAction('[FEED] News Feed Request', props<User>());

export const newsFeedSuccess = createAction('[FEED] News Feed Success', props<FeedResponse>());

export const newsFeedFailure = createAction('[FEED] News Feed Failure', props<FeedResponse>());
