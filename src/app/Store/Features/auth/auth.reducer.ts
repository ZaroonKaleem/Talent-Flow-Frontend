import { createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';
import * as AuthActions from './auth.actions';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

// Create a function to safely get items from localStorage
function getLocalStorageItem(key: string, platformId: any): string | null {
  if (isPlatformBrowser(platformId)) {
    return localStorage.getItem(key);
  }
  return null;
}

// Wrap your reducer in a function to inject PLATFORM_ID
export function createAuthReducer(platformId: any) {
  return createReducer(
    initialState,
    
    // Login
    on(AuthActions.login, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
    
    // Login Success
    on(AuthActions.loginSuccess, (state, { accessToken, encryptedAccessToken, expireInSeconds, userId, rememberClient }) => ({
      ...state,
      accessToken,
      encryptedAccessToken,
      expireInSeconds,
      userId,
      loading: false,
      error: null
    })),
    
    // Login Failure
    on(AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),
    
    // Logout
    on(AuthActions.logout, (state) => ({
      ...state,
      accessToken: null,
      encryptedAccessToken: null,
      expireInSeconds: null,
      userId: null,
      error: null
    })),
    
    // Check Auth - now uses the safe getter function
    on(AuthActions.checkAuth, (state) => ({
      ...state,
      accessToken: getLocalStorageItem('accessToken', platformId) || state.accessToken,
      userId: getLocalStorageItem('userId', platformId) 
        ? Number(getLocalStorageItem('userId', platformId)) 
        : state.userId
    }))
  );
}

// Export the reducer factory
export const authReducer = createAuthReducer;