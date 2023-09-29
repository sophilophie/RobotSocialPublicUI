import {createReducer, on} from '@ngrx/store';
import {FriendRequest, User} from '../../types/user';
import * as AuthActions from './auth.actions';
import * as _ from 'lodash';

export interface AuthState {
  access_token: string | null;
  user: User | null;
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  access_token: null,
  user: null,
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, jwtResponse) => {
    return {
      ...state,
      token: jwtResponse.access_token,
      user: jwtResponse.user,
      isLoggedIn: true,
    };
  }),
  on(AuthActions.loginFailure, (state, jwtResponse) => {
    return {
      ...state,
      loginError: jwtResponse.error,
      token: null,
      user: null,
      isLoggedIn: false,
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      token: null,
      user: null,
      isLoggedIn: false,
    };
  }),
  on(AuthActions.refreshSuccess, (state, jwtResponse) => {
    return {
      ...state,
      token: jwtResponse.access_token,
      user: jwtResponse.user,
      isLoggedIn: true,
    };
  }),
  on(AuthActions.refreshFailure, (state) => {
    return {
      ...state,
      token: null,
      user: null,
      isLoggedIn: false,
    };
  }),
  on(AuthActions.signupSuccess, (state, jwtResponse) => {
    return {
      ...state,
      token: jwtResponse.access_token,
      user: jwtResponse.user,
      isLoggedIn: true,
    };
  }),
  on(AuthActions.signupFailure, (state, jwtResponse) => {
    return {
      ...state,
      loginError: jwtResponse.error,
      token: null,
      user: null,
      isLoggedIn: false,
    };
  }),
  on(AuthActions.updateUserSuccess, (state, user) => {
    return {
      ...state,
      user,
    };
  }),
  on(AuthActions.updateSentFriendRequests, (state, friendRequest) => {
    if (state.user) {
      return {
        ...state,
        user: {
          ...state.user,
          requestedFriends: state.user.requestedFriends?.concat(friendRequest),
        },
      };
    }
    return {...state};
  }),
  on(AuthActions.removeReceivedFriendRequest, (state, friendRequest) => {
    if (state.user) {
      return {
        ...state,
        user: {
          ...state.user,
          requestsReceived: _.filter(state.user.requestsReceived, (request) => request.id !== friendRequest.id),
        },
      };
    }
    return {...state};
  }),
  on(AuthActions.updateFriendships, (state, friendship) => {
    if (state.user) {
      return {
        ...state,
        user: {
          ...state.user,
          friendships: state.user.friendships?.concat(friendship),
        },
      };
    }
    return {...state};
  }),
);
