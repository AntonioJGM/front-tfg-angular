import { Component } from '@angular/core';
import { PrestamoResponseDto } from '../../models/prestamo-responsedto';
import { ReservaResponseDto } from '../../models/reserva-responsedto';
import { PrestamoService } from '../../services/prestamo-service';
import { ReservaService } from '../../services/reserva-service';

@Component({
  selector: 'app-perfil-usuario',
  imports: [],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.css',
})
export class PerfilUsuarioComponent {

  prestamos: PrestamoResponseDto[] = [];
  loading = true;
  reservas: ReservaResponseDto[] = []; 
  loadingReservas = false;
  mensaje?: string;

  constructor(private prestamoService: PrestamoService, private reservaService:ReservaService ) {}

  ngOnInit() {
    this.cargarPrestamos();
    this.cargarReservas();
  }

  cargarPrestamos() {
    this.loading = true;

    this.prestamoService.getMisPrestamos().subscribe({
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
    this.prestamoService.devolver(id).subscribe({
      next: (dto: PrestamoResponseDto) => {
        this.mensaje = `Libro devuelto: ${dto.tituloLibro}`;
        this.cargarPrestamos();
      },
      error: () => {
        this.mensaje = "Error al devolver el préstamo";
      }
    });
  }

  cargarReservas() {
    this.loadingReservas = true;

    this.reservaService.getMisReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        this.loadingReservas = false;
      },
      error: () => {
        this.loadingReservas = false;
      }
    });
  }

  cancelarReserva(id: number) {
    this.reservaService.cancelarReserva(id).subscribe({
      next: () => {
        this.cargarReservas();
      }
    });
  }
}