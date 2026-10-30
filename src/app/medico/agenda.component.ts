import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MedicoServicio } from '../servicios/medico.service';
import { ReservaDto } from '../modelos/reserva.dto';
import { EstadoReserva } from '../enum/estado-reserva.enum';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
})
export class AgendaComponent implements OnInit {
  private readonly messageService = inject(MessageService);
  private readonly medicoServicio = inject(MedicoServicio);

  fechaSeleccionada: string = new Date().toISOString().split('T')[0];
  turnos: ReservaDto[] = [];
  cargando: boolean = false;

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    this.cargando = true;
    this.medicoServicio.obtenerTurnosAgenda(this.fechaSeleccionada).subscribe({
      next: (data) => {
        this.turnos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar la agenda:', err);
        this.cargando = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la agenda. Por favor, intente nuevamente.',
        });
      },
    });
  }

  cambiarEstado(idTurno: number, nuevoEstado: EstadoReserva): void {
    this.medicoServicio
      .actualizarEstadoTurno(idTurno, { estado: nuevoEstado })
      .subscribe({
        next: () => {
          this.cargarTurnos();
        },
        error: (err) => {
          console.error('Error al actualizar el estado del turno:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'No se pudo actualizar el estado del turno. Por favor, intente nuevamente.',
          });
        },
      });
  }
}
