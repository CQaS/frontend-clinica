import { UsuarioProcesado } from './usuario';

export interface MedicoDto {
  id: number;
  id_usuario: number;
  matricula: number;
  valor_consulta: number;
  usuario?: UsuarioProcesado;
}
