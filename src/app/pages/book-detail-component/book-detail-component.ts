import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LibroService } from '../../services/libro-service';
import { PrestamoService } from '../../services/prestamo-service';
import { ReservaService } from '../../services/reserva-service';
import { AuthService } from '../../services/auth-service';
import { LibroModel } from '../../models/libro-model';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail-component.html',
  styleUrls: ['./book-detail-component.css']
})
export class BookDetailComponent implements OnInit {

  libro?: LibroModel;
  loading = true;

  usuarioId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService,
    private prestamoService: PrestamoService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //console.log("TOKEN DECODIFICADO:", this.authService.getDecodedToken());

    //Obtener el id del usuario desde el token 
    this.usuarioId = this.authService.getUsuarioId();
    
    //Obtener el id del libro desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    //Cargar los datos del libro
    this.libroService.getById(id).subscribe({
      next: (data) => {
        this.libro = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  realizarPrestamo() {

    console.log("usuarioId:", this.usuarioId);
    if (!this.libro || !this.usuarioId) return;

    const dto = {
      idLibro: this.libro.idLibro,
      idUsuario: this.usuarioId,
      fechaInicio: new Date().toISOString().split("T")[0]
    };

    this.prestamoService.create(dto).subscribe({
      next: (res) => {
        alert("Préstamo realizado correctamente");
        this.libro!.disponible = false;
      },
      error: (err) => {
        console.error(err);
        alert("Error al realizar el préstamo");
      }
    });
  }

  reservarLibro() {
    if (!this.libro || !this.usuarioId) return;

    const dto = {
      idLibro: this.libro.idLibro,
      idUsuario: this.usuarioId,
      fechaReserva: new Date().toISOString().split('T')[0]
    };

    this.reservaService.create(dto).subscribe({
      next: (res) => {
        alert("Reserva realizada correctamente");
      },
      error: (err) => {
        console.error(err);
        alert("Error al reservar el libro");
      }
    });
  }

  volverALista() { 
    this.router.navigate(['']); 
  }
}
