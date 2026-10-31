import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthStore } from './auth.store';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authStore = inject(AuthStore);
  const authToken = authStore.obtenerToken();

  console.log('Token obtenido en el interceptor:', authToken);

  if (!authToken) {
    console.warn(
      '¡Atención! La petición va sin token porque authToken está vacío.',
    );
    return next(req);
  }

  const reqWithToken = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`),
  });

  return next(reqWithToken);
}
