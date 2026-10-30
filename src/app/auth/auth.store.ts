import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly TOKEN_KEY = 'accessToken';
  private readonly router = inject(Router);

  guardarToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  obtenerToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  limpiar(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.router.navigateByUrl('/login');
  }
}
