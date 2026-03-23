export interface UsuarioModel {
  idUsuario: number;
  nombre: string;
  apellidos: string;
  email: string;
  rol: 'ADMIN' | 'USUARIO' | 'BIBLIOTECARIO';
  activo: boolean;
}