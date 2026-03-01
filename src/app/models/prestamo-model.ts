import { LibroModel } from './libro-model';
import { UsuarioModel } from './usuario-model';

export interface PrestamoModel {
  id: number;
  libro: LibroModel;
  usuario: UsuarioModel;
  fechaPrestamo: string;
  fechaDevolucion?: string;
  devuelto: boolean;
}