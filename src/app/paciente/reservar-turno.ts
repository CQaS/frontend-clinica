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

    medicos:any[] = [];
    horariosBase: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
    horariosDisponibles:string[]=[...this.horariosBase];

    minFecha:string = '';
    maxFecha:string = '';

    ngOnInit() {
        this.calcularFechasPermitidas();
        this.cargarMedicos();
    }

    calcularFechasPermitidas() {
        const hoy = new Date();

        const formatoFecha = (fecha:Date)=> {
            const año = fecha.getFullYear();
            const mes = String(fecha.getMonth() + 1).padStart(2,'0');
            const dia = String(fecha.getDate()).padStart(2,'0');
        return `${año}-${mes}-${dia}`;
        };

        this.minFecha = formatoFecha(hoy);

        const maxDias = new Date(hoy);
        maxDias.setDate(maxDias.getDate()+30);
        this.maxFecha = formatoFecha(maxDias);
    }

    cargarMedicos() {
        this.reservasService.obtenerMedicos().subscribe({
            next: (datos) => {
                this.medicos = datos;
                console.log('Medicos cargados:', datos);
            },
            error:(err) => {
                console.error('Error al cargar médicos:', err);
                alert('No se pudieron cargar los médicos.');
            }
        });
    }

    cargarDisponibilidad() {
        if (!this.medicoSeleccionado || !this.fechaSeleccionada) {
            this.horariosDisponibles = [...this.horariosBase];
            this.horaSeleccionada = '';
            return;
        }

        this.reservasService.obtenerDisponibilidad(
            Number(this.medicoSeleccionado), this.fechaSeleccionada).subscribe({
                next: (ocupados)=> {
                    this.horariosDisponibles = this.horariosBase.filter(
                        hora=> !ocupados.includes(hora));

                        if (!this.horariosDisponibles.includes(this.horaSeleccionada)) {
                            this.horaSeleccionada = '';
                        }
                },
                error: (err)=> {
                    console.error('Error al consultar disponibilidad', err);
                    this.horariosDisponibles = [];
                    this.horaSeleccionada ='';
                    alert('No se pudo consultar la disponibilidad. Intentá nuevamente.');
                }
            });
    }

    confirmarReserva(){
        if (!this.medicoSeleccionado || !this.fechaSeleccionada || !this.horaSeleccionada){
            alert('Por favor completa todos los campos.');
            return;
        }

        const idMedicoNum = Number(this.medicoSeleccionado);

        const nuevoTurno = {
        idMedico: idMedicoNum,
        fechaHora: `${this.fechaSeleccionada}T${this.horaSeleccionada}:00`, 
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

            const mensaje = err.error?.message || 'No se pudo procesar la reserva. Intentá nuevamente.';
            alert(mensaje);
        }
    });
}
}