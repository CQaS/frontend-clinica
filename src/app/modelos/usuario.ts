export interface UsuarioProcesado {
  id: number;
  documento: string;
  apellidos: string;
  nombres: string;
  email: string;
  estado: string;
  rol: string;
  mensajeBienvenida: string;
  permisos: string[];
}
