export interface PrestamoResponseDto {
  idPrestamo: number;
  fechaInicio: string;
  fechaFin: string;
  fechaDevolucion?: string;
  diasRetraso: number;
  importeSancion: number;
  nombreUsuario: string;
  tituloLibro: string;
  idUsuario: number;
  idLibro: number;
}