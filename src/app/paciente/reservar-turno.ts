import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservasService } from '../servicios/reservas.service';

@Component({
    selector: 'app-reservar-turno',
    standalone:true,
    imports: [CommonModule, FormsModule],
    templateUrl: './reservar-turno.html',
    styleUrls: ['./reservar-turno.css']
})
export class ReservarTurnoPaciente implements OnInit{
    private readonly reservasService = inject(ReservasService);

    medicoSeleccionado:string ='';
    fechaSeleccionada:string = '';
    horaSeleccionada:string ='';

    medicos:string[]=['Dr. Pérez', 'Dra. Gómez', 'Dr. Rodríguez'];
    horariosDisponibles:string[]=['09:00', '10:00', '11:00', '14:00', '15:00'];

    minFecha:string = '';
    maxFecha:string = '';

    ngOnInit() {
        this.calcularFechasPermitidas();
    }

    calcularFechasPermitidas() {
        const hoy = new Date();
        this.minFecha = hoy.toISOString().split('T')[0];

        const maxDias = new Date();
        maxDias.setDate(hoy.getDate()+30);
        this.maxFecha = maxDias.toISOString().split('T')[0];
    }

    confirmarReserva(){
        if (!this.medicoSeleccionado || !this.fechaSeleccionada || !this.horaSeleccionada){
            alert('Por favor completa todos los campos.');
            return;
        }

    const nuevoTurno = {
        medico: this.medicoSeleccionado,
        fecha: `${this.fechaSeleccionada}T${this.horaSeleccionada}:00`,
        estado: 'Active'
    };

    this.reservasService.crearTurno(nuevoTurno).subscribe({
        next: () => {
            alert('Turno reservado con éxito.');
            this.medicoSeleccionado = '';
            this.fechaSeleccionada = '';
            this.horaSeleccionada = '';
        },
        error: (err) =>{
            console.error('Error al registrar el turno:', err);
            alert('Hubo un error al procesar la reserva.');
        }
    });
}
}