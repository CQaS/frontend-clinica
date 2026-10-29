import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Usamos '/api' para que el proxy lo redirija al backend en el puerto 3000
  private apiUrl = '/api'; 

  login(credentials: { email: string; clave: string }) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.usuario));
        }
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getRole(): string {
    return this.getUser()?.rol || '';
  }

  isActivo(): boolean {
    return this.getUser()?.estado === 'ACTIVO';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token') && this.isActivo();
  }
}