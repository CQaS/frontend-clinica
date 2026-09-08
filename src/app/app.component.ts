import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosServicio } from './servicios/usuarios.service';
import { UsuarioProcesado } from './modelos/usuario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly usuariosServicio = inject(UsuariosServicio);
  public usuarios: UsuarioProcesado[] = [];

  ngOnInit(): void {
    this.usuariosServicio.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      },
    });
  }
}
