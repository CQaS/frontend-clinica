import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../auth/auth.store';

export const roleGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const token = authStore.obtenerToken();
  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  const rolEsperado = route.data?.['role'];
  if (rolEsperado) {
    const userRole = authStore.obtenerRol();

    if (userRole !== rolEsperado) {
      router.navigateByUrl('/login');
      return false;
    }
  }

  return true;
};
