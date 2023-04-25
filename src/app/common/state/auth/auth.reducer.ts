import { createReducer, on } from "@ngrx/store";
import { User } from "../../types/user";
import { loginFailure, loginSuccess } from "./auth.actions";

export interface AuthState {
  access_token: string | null;
  user: User | null;
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  access_token: null,
  user: null,
  isLoggedIn: false,
}

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, jwtResponse) => {
    return {
      ...state,
      token: jwtResponse.access_token,
      user: jwtResponse.user,
      isLoggedIn: true
    }
  }),
  on(loginFailure, (state, jwtResponse) => {
    return {
      ...state,
      loginError: jwtResponse.error,
      token: null,
      user: null,
      isLoggedIn: false
    }
  })
)