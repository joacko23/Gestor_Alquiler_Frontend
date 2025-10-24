import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('jwt');

  if (token) {
    return true; // ✅ Usuario autenticado
  } else {
    router.navigate(['/login']);
    return false; // 🚫 Bloquear acceso
  }
};
