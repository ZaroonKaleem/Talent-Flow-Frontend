import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './auth-service.service';
import { 
  login, 
  loginSuccess, 
  loginFailure, 
  logout,
  checkAuth
} from './auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  // Login Effect
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action) =>
        this.authService.login(
          action.userNameOrEmailAddress,
          action.password,
          action.rememberClient
        ).pipe(
          map((response) => 
            loginSuccess({ 
              accessToken: response.result.accessToken,
              encryptedAccessToken: response.result.encryptedAccessToken,
              expireInSeconds: response.result.expireInSeconds,
              userId: response.result.userId,
              rememberClient: action.rememberClient
            })
          ),
          catchError((error) => 
            of(loginFailure({ error: error.error?.message || 'Login failed' }))
          )
        )
      )
    )
  );

  // Login Success Effect
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          // Store auth data based on rememberClient
          const storage = action.rememberClient ? localStorage : sessionStorage;
          
          storage.setItem('accessToken', action.accessToken);
          storage.setItem('encryptedAccessToken', action.encryptedAccessToken);
          storage.setItem('expireInSeconds', action.expireInSeconds.toString());
          storage.setItem('userId', action.userId.toString());
          
          // Navigate to dashboard
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  // Logout Effect
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          // Clear all auth storage
          localStorage.removeItem('accessToken');
          localStorage.removeItem('encryptedAccessToken');
          localStorage.removeItem('expireInSeconds');
          localStorage.removeItem('userId');
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('encryptedAccessToken');
          sessionStorage.removeItem('expireInSeconds');
          sessionStorage.removeItem('userId');
          
          // Navigate to login
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  // Check Auth Effect (on app init)
  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuth),
      map(() => {
        // Check if token exists in storage
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
        
        if (token && userId) {
          return loginSuccess({
            accessToken: token,
            encryptedAccessToken: localStorage.getItem('encryptedAccessToken') || 
                                sessionStorage.getItem('encryptedAccessToken') || '',
            expireInSeconds: Number(localStorage.getItem('expireInSeconds') || 
                                  sessionStorage.getItem('expireInSeconds') || 0),
            userId: Number(userId),
            rememberClient: !!localStorage.getItem('accessToken')
          });
        }
        
        return logout();
      })
    )
  );
}