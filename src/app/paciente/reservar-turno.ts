import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ReservasService } from '../servicios/reservas.service';
import { MedicoServicio } from '../servicios/medico.service';

@Component({
  selector: 'app-reservar-turno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservar-turno.html',
  styleUrls: ['./reservar-turno.css'],
})
export class ReservarTurnoPaciente implements OnInit {
  private readonly messageService = inject(MessageService);
  private readonly reservasService = inject(ReservasService);
  private readonly medicoServicio = inject(MedicoServicio);

  medicos: any[] = [];
  medicoSeleccionadoId: any = "";

  fechaSeleccionada: string = '';
  horaSeleccionada: string = '';

  horariosDisponibles: string[] = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
  ];

  minFecha: string = '';
  maxFecha: string = '';

  ngOnInit() {
    this.calcularFechasPermitidas();
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoServicio.obtenerMedicos().subscribe({
      next: (data) => {
        this.medicos = data;
      },
      error: (err) => {
        console.error('Error al cargar médicos:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            'No se pudieron cargar los médicos. Intenta nuevamente más tarde.',
        });
      },
    });
  }

  calcularFechasPermitidas() {
    const hoy = new Date();
    this.minFecha = hoy.toISOString().split('T')[0];

    const maxDias = new Date();
    maxDias.setDate(hoy.getDate() + 30);
    this.maxFecha = maxDias.toISOString().split('T')[0];
  }

  confirmarReserva() {
    if (
      !this.medicoSeleccionadoId ||
      !this.fechaSeleccionada ||
      !this.horaSeleccionada
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Por favor, completa todos los campos antes de reservar.',
      });
      return;
    }

    
    const usuarioGuardado = localStorage.getItem('usuario');
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    const pacienteId = usuario ? usuario.id : null;

    if (!pacienteId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo recuperar la información del paciente.',
      });
      return;
    }

    const nuevoTurno = {
      idMedico: Number(this.medicoSeleccionadoId),
      idPaciente: Number(pacienteId),
      fechaHora: `${this.fechaSeleccionada}T${this.horaSeleccionada}:00`,
    };

    console.log('Enviando turno:', nuevoTurno); 

    this.reservasService.crearTurno(nuevoTurno).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Turno reservado',
          detail: 'Tu turno ha sido reservado exitosamente.',
        });
        this.medicoSeleccionadoId = null;
        this.fechaSeleccionada = '';
        this.horaSeleccionada = '';
      },
      error: (err) => {
        console.error('Error al registrar el turno:', err.error.message);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `No se pudo registrar el turno. Razón: ${err.error.message || 'Error desconocido'}.`,
        });
      },
    });
  }
}
