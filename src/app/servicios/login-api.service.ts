import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginApiClient {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/v1';

  login(credenciales: { email: string; clave: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credenciales);
  }
}
