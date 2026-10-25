import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../servicios/reservas.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-turnos.html',
  styleUrls: ['./mis-turnos.css']
})
export class MisTurnosPaciente implements OnInit {
  private readonly reservasService = inject(ReservasService);
  turnos: any[] = [];

  ngOnInit() {
    this.cargarTurnos();
  }

  cargarTurnos(){
    this.reservasService.obtenerTurnos().subscribe({
      next: (datos) => {
        this.turnos = datos;
        console.log('Turnos obtenidos con éxito:', datos);
      },
      error: (err) => console.error('Error al conectar con el back:', err),
    });
  }

  puedeCancelar(turno:any):boolean{
    if (turno.estado !=='Active'){
      return false;
    }

    const fechaTurno = new Date(turno.fecha);
    const hoy = new Date();

    fechaTurno.setHours(0,0,0,0);
    hoy.setHours(0,0,0,0);

    return fechaTurno.getTime() > hoy.getTime();
    
  }

  cancelarTurno(id:string){
    if (confirm('Estás seguro de que deseas cancelar este turno?')){
      this.reservasService.cancelarTurno(id).subscribe({
        next:() => {
          this.cargarTurnos();
        },
        error:(err)=> console.error('Error al cancelar el turno:', err)
      });
    }
  }
}
