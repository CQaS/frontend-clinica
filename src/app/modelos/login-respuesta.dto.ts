export interface LoginRespuestaDto {
    access_token: string;

    usuario: {
        id: number;
        documento: string;
        apellidos: string;
        nombres: string;
        email: string;
        estado: string;
        rol: string;
    }
}