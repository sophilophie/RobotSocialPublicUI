import {createReducer, on} from '@ngrx/store';
import {User} from '../../types/user';
import * as AuthActions from './auth.actions';

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
);
