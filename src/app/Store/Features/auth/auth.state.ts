import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

export interface AuthState {
  accessToken: string | null;
  encryptedAccessToken: string | null;
  expireInSeconds: number | null;
  userId: number | null;
  loading: boolean;
  error: string | null;
}

// Create a function to initialize state safely
export function getInitialAuthState(platformId: any): AuthState {
  const isBrowser = isPlatformBrowser(platformId);
  
  return {
    accessToken: isBrowser ? localStorage.getItem('accessToken') : null,
    encryptedAccessToken: isBrowser ? localStorage.getItem('encryptedAccessToken') : null,
    expireInSeconds: isBrowser && localStorage.getItem('expireInSeconds') 
      ? Number(localStorage.getItem('expireInSeconds')) 
      : null,
    userId: isBrowser && localStorage.getItem('userId') 
      ? Number(localStorage.getItem('userId')) 
      : null,
    loading: false,
    error: null
  };
}

// Export initial state (will be initialized in the module)
export let initialState: AuthState;