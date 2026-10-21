import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ReservasService {
    private apiUrl = 'http://localhost:3000/api/reservas';

    constructor(private http: HttpClient) {}

    obtenerTurnos(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    crearTurno(turnoData:any): Observable<any> {
        return this.http.post<any>(this.apiUrl, turnoData);
    }

    cancelarTurno(id:string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/cancelar/${id}`, {});
    }

}