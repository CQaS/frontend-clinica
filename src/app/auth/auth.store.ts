import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly TOKEN_KEY = 'accessToken';

  guardarToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  obtenerToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  limpiar(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}