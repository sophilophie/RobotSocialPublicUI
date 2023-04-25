import { createAction, props } from "@ngrx/store";
import { JwtReponse, LoginDto } from "../../types/user";

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