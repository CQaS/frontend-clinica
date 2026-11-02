import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private contadorCargas = 0;
  public cargando = signal<boolean>(false);

  mostrar() {
    this.contadorCargas++;
    this.cargando.set(true);
  }

  ocultar() {
    if (this.contadorCargas > 0) {
      this.contadorCargas--;
    }
    if (this.contadorCargas === 0) {
      this.cargando.set(false);
    }
  }
}
