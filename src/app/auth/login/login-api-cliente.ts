import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginApiClient {
  private readonly http = inject(HttpClient);
  
  // Cambia esta URL por la de tu backend si es distinta
  private readonly apiUrl = 'http://localhost:3000/auth/login'; 

  login(credenciales: { nombre: string; clave: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credenciales);
  }
}