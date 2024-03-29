import {createAction, props} from '@ngrx/store';
import {JwtResponse, LoginDto, JwtDto, FriendRequestDto, FriendRequest, Friendship} from '../../types/user';
import {User} from 'src/app/common/types/user';

export const loginRequest = createAction('[AUTH] Login Request', props<LoginDto>());

export const loginSuccess = createAction('[AUTH] Login Success', props<JwtResponse>());

export const loginFailure = createAction('[AUTH] Login Failure', props<JwtResponse>());

export const logout = createAction('[AUTH] Logout');

export const refreshRequest = createAction('[AUTH] Refresh Request', props<JwtDto>());

export const refreshSuccess = createAction('[AUTH] Refresh Success', props<JwtResponse>());

export const refreshFailure = createAction('[AUTH] Refresh Failure', props<JwtResponse>());

export const signupRequest = createAction('[AUTH] Signup Request', props<User>());

export const signupSuccess = createAction('[AUTH] Signup Success', props<JwtResponse>());

export const signupFailure = createAction('[AUTH] Signup Failure', props<JwtResponse>());

export const updateUserRequest = createAction('[AUTH] Update User Request', props<User>());

export const updateUserSuccess = createAction('[AUTH] Update User Success', props<User>());

export const updateUserFailure = createAction('[AUTH Update User Failure', props<User>());

export const updateSentFriendRequests = createAction('[AUTH] Update User Friend Requests', props<FriendRequest>());

export const removeReceivedFriendRequest = createAction('[AUTH] Remove User Friend Request', props<FriendRequest>());

export const updateFriendships = createAction('[AUTH] Update User Friendships', props<Friendship>());
