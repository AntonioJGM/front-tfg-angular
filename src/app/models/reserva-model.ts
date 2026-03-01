import { LibroModel } from './libro-model';
import { UsuarioModel } from './usuario-model';

export interface ReservaModel {
  id: number;
  libro: LibroModel;
  usuario: UsuarioModel;
  fechaReserva: string;
  activa: boolean;
}