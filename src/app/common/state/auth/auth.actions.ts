import { createAction, props } from "@ngrx/store";
import { JwtReponse, LoginDto, JwtDto } from "../../types/user";

export const loginRequest = createAction(
  '[AUTH] Login Request',
  props<LoginDto>()
);

export const loginSuccess = createAction(
  '[AUTH] Login Success',
  props<JwtReponse>()
);

export const loginFailure = createAction(
  '[AUTH] Login Failure',
  props<JwtReponse>()
);

export const refreshRequest = createAction(
  '[AUTH] Refresh Request',
  props<JwtDto>()
);

export const refreshSuccess = createAction(
  '[AUTH] Refresh Success',
  props<JwtReponse>()
);

export const refreshFailure = createAction(
  '[AUTH] Refresh Failure',
  props<JwtReponse>()
);
