import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtenemos el rol requerido que definimos en las rutas (ej: 'ADMINISTRADOR', 'MEDICO', 'PACIENTE')
  const expectedRole = route.data['role'];

  // Verificamos que esté autenticado, activo y que su rol coincida
  if (authService.isAuthenticated() && authService.getRole() === expectedRole) {
    return true;
  }

  // Si no tiene permisos o no está logueado, lo redirigimos al login
  router.navigate(['/login']);
  return false;
};