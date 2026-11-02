import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ReservasService {
    private apiUrl = '/api/v1/reservas';

    constructor(private http: HttpClient) {}

    obtenerDisponibilidad(idMedico: number, fecha: string): Observable<string[]>{
        return this.http.get<string[]>(`${this.apiUrl}/disponibilidad`,
            {
                params: {
                    idMedico: idMedico.toString(),
                    fecha: fecha
                }
            }
        );
    }
    

    obtenerTurnos(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    obtenerMedicos(): Observable<any[]> {
        return this.http.get<any[]>('/api/v1/medicos');
    }

    crearTurno(turnoData:any): Observable<any> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        return this.http.post<any>(this.apiUrl, turnoData, { headers });
    }

    cancelarTurno(id:string): Observable<any> {
        return this.http.patch<any>(`${this.apiUrl}/${id}/cancelar`, {});
    }

}