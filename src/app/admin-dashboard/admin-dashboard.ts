import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  medicos: any[] = [];
  turnos: any[] = [];
  
  nuevoValor: number = 0;
  selectedMedicoId: number | null = null;
  
  private formatoFechaLocal(fecha: Date): string {
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  const hora = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');

  return `${año}-${mes}-${dia}T${hora}:${minutos}`;
}
fechaMinima = this.formatoFechaLocal(
  new Date(Date.now() + 60 * 1000)
);
fechaMaxima = this.formatoFechaLocal(
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
);


  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarMedicos();
    this.cargarTurnos();
  }

  cargarMedicos() {
  this.adminService.getMedicos().subscribe({
    next: (data) => {
      this.medicos = data;
    },
    error: () => {
      alert('No se pudieron cargar los médicos.');
    }
  });
}
  
  actualizarPrecio(medicoId: number, precio: number) {
  if (!Number.isInteger(precio) || precio <= 0) {
    alert('Ingresá un valor de consulta entero y mayor que cero.');
    return;
  }

  this.adminService.actualizarValorConsulta(medicoId, precio).subscribe({
    next: () => {
      alert('¡Valor de consulta actualizado con éxito!');
      this.cargarMedicos();
    },
    error: () => alert('No se pudo actualizar el valor de consulta.')
  });
}

  cargarTurnos() {
  this.adminService.getTurnos().subscribe({
    next: (data) => {
      this.turnos = data.sort(
        (a: any, b: any) =>
          new Date(a.fechaHora).getTime() -
          new Date(b.fechaHora).getTime()
      );
    },
    error: () => {
      alert('No se pudieron cargar los turnos.');
    }
  });
}

  cancelarTurno(id: number) {
    if (confirm('¿Estás seguro de cancelar este turno?')) {
      this.adminService.cancelarTurno(id).subscribe({
        next: () => {
          alert('Turno cancelado correctamente');
          this.cargarTurnos();
        },
        error: () => alert('No se pudo cancelar el turno')
      });
    }
  }

  
  puedeCancelar(turno: any): boolean {
  return (
    turno.estado === 'ACTIVO' &&
    new Date(turno.fechaHora).getTime() > Date.now()
    );
  }


  //nueva reserva
  nuevoTurno = {
  idMedico: null as number | null,
  idPaciente: null as number | null,
  fechaHora: ''
};

  //enviar la reserva
reservarTurnoForm() {
  if (
    !this.nuevoTurno.idMedico ||
    this.nuevoTurno.idMedico < 1 ||
    !Number.isInteger(this.nuevoTurno.idMedico) ||
    !this.nuevoTurno.idPaciente ||
    this.nuevoTurno.idPaciente < 1 ||
    !Number.isInteger(this.nuevoTurno.idPaciente) ||
    !this.nuevoTurno.fechaHora
) {
  alert('Completá los campos e ingresá IDs válidos.');
  return;
}


  if (!this.horarioValido()) {
    alert('Seleccioná un horario entre las 08:00 y las 15:00, en punto.');
    return;
  }

  const fechaSeleccionada = new Date(this.nuevoTurno.fechaHora);
  const ahora = new Date();
  const limiteMaximo = new Date(
    ahora.getTime() + 30 * 24 * 60 * 60 * 1000
  );

  if (fechaSeleccionada <= ahora || fechaSeleccionada > limiteMaximo) {
    alert('El turno debe ser futuro y estar dentro de los próximos 30 días.');
    return;
  }

  this.adminService.reservarTurno({
    ...this.nuevoTurno,
    fechaHora: new Date(this.nuevoTurno.fechaHora).toISOString()
  }).subscribe({
    next: () => {
      alert('¡Turno reservado con éxito!');
      this.cargarTurnos();
    },
    error: () => alert('Error al reservar el turno')
  });
}


horarioValido(): boolean {
  if (!this.nuevoTurno.fechaHora) {
    return false;
  }

  const horaSeleccionada = this.nuevoTurno.fechaHora.split('T')[1];

  if (!horaSeleccionada) {
    return false;
  }

  const [hora, minutos] = horaSeleccionada.split(':').map(Number);

  return hora >= 8 && hora < 16 && minutos === 0;
}
}