import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAccessToken = createSelector(
  selectAuthState,
  (state) => state.accessToken
);

export const selectEncryptedAccessToken = createSelector(
  selectAuthState,
  (state) => state.encryptedAccessToken
);

export const selectUserId = createSelector(
  selectAuthState,
  (state) => state.userId
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectIsAuthenticated = createSelector(
  selectAccessToken,
  (token) => !!token
);