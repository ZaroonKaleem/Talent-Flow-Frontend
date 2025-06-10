import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ userNameOrEmailAddress: string; password: string; rememberClient: boolean }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ 
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;
    rememberClient: boolean;
  }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const refreshToken = createAction('[Auth] Refresh Token');

export const checkAuth = createAction('[Auth] Check Authentication');