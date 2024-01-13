import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../State/Auth/auth.service";

export const authGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const roles = route.data?.['roles'];

  if (!authService.isLoggedIn() || (roles && !roles.includes(authService.getRole()))) {
    router.navigate(['']).then(r => console.log(r));
    return false;
  }

  return true;
};
