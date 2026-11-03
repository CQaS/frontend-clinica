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

  guardarUsuario(usuario: string): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  obtenerUsuario(): any | null {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        return JSON.parse(usuarioGuardado);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  limpiar(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.router.navigateByUrl('/login');
  }

  obtenerRol(): string | null {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        const usuario = JSON.parse(usuarioGuardado);
        console.log('Rol guardado:', usuario.rol);
        return usuario.rol || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}
