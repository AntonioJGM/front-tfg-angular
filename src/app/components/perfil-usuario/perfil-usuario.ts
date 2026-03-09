import { Component } from '@angular/core';
import { PrestamoModel } from '../../models/prestamo-model';
import { PrestamoResponseDto } from '../../models/prestamo-responsedto';
import { PrestamoService } from '../../services/prestamo-service';

@Component({
  selector: 'app-perfil-usuario',
  imports: [],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.css',
})
export class PerfilUsuarioComponent {

  prestamos: PrestamoResponseDto[] = [];
  loading = true;
  mensaje?: string;

  constructor(private prestamosService: PrestamoService) {}

  ngOnInit() {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.loading = true;

    this.prestamosService.getMisPrestamos().subscribe({
      next: (data) => {
        this.prestamos = data;
        this.loading = false;
      },
      error: () => {
        this.mensaje = "Error cargando préstamos";
        this.loading = false;
      }
    });
  }

  devolver(id: number) {
    this.prestamosService.devolver(id).subscribe({
      next: (dto: PrestamoResponseDto) => {
        this.mensaje = `Libro devuelto: ${dto.tituloLibro}`;
        this.cargarPrestamos();
      },
      error: () => {
        this.mensaje = "Error al devolver el préstamo";
      }
    });
  }

}
