import { Component, inject  } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStore } from '../../auth/auth.store';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  //styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {

  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router)

  get etiquetaRol(): string {
    const etiquetas: Record<string, string> = {
      PACIENTE: 'Paciente',
      MEDICO: 'Médico',
      ADMINISTRADOR: 'Administrador',
    };

    return etiquetas[this.authStore.obtenerUsuario()?.rol] ?? 'Usuario';
  }

  get nombreUsuario(): string {
    const usuario = this.authStore.obtenerUsuario();
    if (!usuario) return '';

    return `${usuario.nombres || ''} ${usuario.apellidos || ''}`.trim();
  }

  cerrarSesion(): void {
    this.authStore.limpiar();
    this.router.navigateByUrl('/login')
  }
}