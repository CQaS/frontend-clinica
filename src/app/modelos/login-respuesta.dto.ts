import { EstadoUsuario } from '../enum/estado-usuario.enum';
import { RolUsuario } from '../enum/rol-usuario.enum';

export interface LoginRespuestaDto {
  access_token: string;

  usuario: {
    id: number;
    documento: string;
    apellidos: string;
    nombres: string;
    email: string;
    estado: EstadoUsuario;
    rol: RolUsuario;
  };
}
