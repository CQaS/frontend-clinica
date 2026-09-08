import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioProcesado } from '../modelos/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosServicio {
  private readonly http = inject(HttpClient);
  private readonly urlApi = 'http://localhost:3000/api/usuarios';

  obtenerUsuarios(): Observable<UsuarioProcesado[]> {
    return this.http.get<UsuarioProcesado[]>(this.urlApi);
  }
}
