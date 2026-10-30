export interface MedicoDto {
    id: number;
    id_usuario: number;
    matricula: number;
    valor_consulta: number;

    apellidos?: string;
    nombres?: string;
    email?: string
}