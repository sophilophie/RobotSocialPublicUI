import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../state/state';
import {AuthState} from '../state/auth/auth.reducer';
import {map} from 'rxjs';

export const canActivateAppGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const state$ = inject(Store).select((state: AppState | object) => (state as AppState).auth);
  const router = inject(Router);
  return state$.pipe(
    map((authState: AuthState) => {
      if (authState.isLoggedIn) {
        return true;
      }
      router.navigate(['/login']);
      return false;
    }),
  );
};
