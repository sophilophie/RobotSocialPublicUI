import {createAction, props} from '@ngrx/store';
import {JwtResponse, LoginDto, JwtDto} from '../../types/user';
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
