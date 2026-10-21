import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosServicio } from '../servicios/usuarios.service';
import { UsuarioProcesado } from '../modelos/usuario';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-turnos.html',
})
export class MisTurnosPaciente implements OnInit {
  private readonly usuariosServicio = inject(UsuariosServicio);
  usuarios: UsuarioProcesado[] = [];

  ngOnInit() {
    this.usuariosServicio.obtenerUsuarios().subscribe({
      next: (datos) => {
        this.usuarios = datos;
        console.log('Usuarios obtenidos con éxito:', datos);
      },
      error: (err) => console.error('Error al conectar con el back:', err),
    });
  }
}
