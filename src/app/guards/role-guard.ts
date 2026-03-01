import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['role'];
  const userRole = authService.getRole();

  if (userRole === expectedRole) {
    return true;
  }

  router.navigate(['/']);
  return false;
};