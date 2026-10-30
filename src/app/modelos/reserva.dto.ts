export interface ReservaDto {
    id: number;
    idMedico: number;
    idPaciente: number;
    fechaHora: string;
    valorConsulta: number;
    estado: string;
    nombreMedico?: string;
    nombrePaciente?: string
}