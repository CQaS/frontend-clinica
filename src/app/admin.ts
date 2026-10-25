
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  private obtenerHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
  }

  getMedicos(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/medicos`,
      { headers: this.obtenerHeaders() }
    );
  }

  actualizarValorConsulta(
    medicoId: number,
    nuevoValor: number
  ): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/medicos/${medicoId}/valor-consulta`,
      { valor_consulta: nuevoValor },
      { headers: this.obtenerHeaders() }
    );
  }

  getTurnos(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/reservas`,
      { headers: this.obtenerHeaders() }
    );
  }

  reservarTurno(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/reservas`,
      data,
      { headers: this.obtenerHeaders() }
    );
  }

  cancelarTurno(id: number): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/reservas/${id}/cancelar`,
      {},
      { headers: this.obtenerHeaders() }
    );
  }
}
