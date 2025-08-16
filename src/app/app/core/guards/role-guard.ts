import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth)
  const router = inject(Router)
  if ( auth.isLoggedIn() && auth.getUserRole() === 'admin' ) {
    return true 
  }
  router.navigate(['/dashboard'])
  return false 
};
