import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaDto } from '../modelos/reserva.dto';
import { ActualizarEstadoReservaDto } from '../modelos/actualizar-estado-reserva.dto';
import { MedicoDto } from '../modelos/medico.dto';

@Injectable({
  providedIn: 'root',
})
export class MedicoServicio {
  private readonly http = inject(HttpClient);
  private readonly urlApi = '/api/v1';

  obtenerTurnosAgenda(fecha?: string): Observable<ReservaDto[]> {
    let params = new HttpParams();
    if (fecha) {
      params = params.set('fecha', fecha);
    }
    return this.http.get<ReservaDto[]>(`${this.urlApi}/reservas`, { params });
  }

  actualizarEstadoTurno(
    idReserva: number,
    datosEstado: ActualizarEstadoReservaDto,
  ): Observable<ReservaDto> {
    return this.http.patch<ReservaDto>(
      `${this.urlApi}/reservas/${idReserva}/estado`,
      datosEstado,
    );
  }

  obtenerMedicos(): Observable<MedicoDto[]> {
    return this.http.get<MedicoDto[]>(`${this.urlApi}/medicos`);
  }
}
