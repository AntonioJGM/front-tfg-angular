import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AdminService } from '../../services/admin-service';
import { PrestamoResponseDto } from '../../models/prestamo-responsedto';
import { LibroModel } from '../../models/libro-model';
import { UsuarioModel } from '../../models/usuario-model';

@Component({
  selector: 'app-gestionar-prestamos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './gestionar-prestamos.html',
  styleUrl: './gestionar-prestamos.css',
})
export class GestionarPrestamosComponent implements OnInit {

  prestamos: PrestamoResponseDto[] = [];
  libros: LibroModel[] = [];
  usuarios: UsuarioModel[] = [];

  mensaje: string | null = null;
  modoEdicion = false;
  prestamoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.prestamoForm = this.fb.group({
      idPrestamo: [null],
      idLibro: ['', Validators.required],
      idUsuario: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: [''],
      fechaDevolucion: [''],
    });

    this.prestamoForm.get('fechaInicio')?.valueChanges.subscribe(fecha => {
      if (fecha) {
        const fechaInicio = new Date(fecha);
        const fechaFin = new Date(fechaInicio);
        fechaFin.setDate(fechaFin.getDate() + 20);
        // Convertimos a formato yyyy-MM-dd para el input type="date"
        const fechaFinISO = fechaFin.toISOString().split('T')[0];
      this.prestamoForm.patchValue({fechaFin: fechaFinISO});
      }
    });


    this.cargarPrestamos();
    this.cargarLibrosDisponibles();
    this.cargarUsuarios();
  }

  cargarLibrosDisponibles() {
    this.adminService.getLibros().subscribe({
      next: (data) => {
        this.libros = data.filter(libro => libro.disponible === true);
        console.log("LIBROS DISPONIBLES:", this.libros);
      },
      error: () => this.mensaje = 'Error al cargar los libros'
    });
  }

  cargarUsuarios() {
    this.adminService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log("USUARIOS:", data);
      },
      error: () => this.mensaje = 'Error al cargar usuarios'
    });
  }

  cargarPrestamos() {
    this.adminService.getPrestamos().subscribe({
      next: (data: PrestamoResponseDto[]) => {
        console.log("PRESTAMOS RECIBIDOS:", data);
        this.prestamos = data;
      },
      error: () => this.mensaje = 'Error al cargar los préstamos'
    });
  }

  guardarPrestamo() {
   
    console.log("FORM VALUE:", this.prestamoForm.value);

    if (this.prestamoForm.invalid) return;

    const form = this.prestamoForm.value;

    const prestamo = {
      idPrestamo: form.idPrestamo,
      idLibro: form.idLibro,
      idUsuario: form.idUsuario,
      fechaInicio: form.fechaInicio,
      fechaFin: form.fechaFin,
      fechaDevolucion: form.fechaDevolucion
    };

    if (this.modoEdicion) {
      this.actualizarPrestamo(prestamo);
    } else {
      this.crearPrestamo(prestamo);
    }
  }

  crearPrestamo(prestamo: any) {
    this.adminService.crearPrestamo(prestamo).subscribe({
      next: () => {
        this.mensaje = 'Préstamo creado correctamente';
        this.resetFormulario();
        this.cargarPrestamos();
      },
      error: () => this.mensaje = 'Error al crear el préstamo'
    });
  }

  cargarPrestamoParaEditar(prestamo: PrestamoResponseDto) {
    this.modoEdicion = true;

    this.prestamoForm.patchValue({
      idPrestamo: prestamo.idPrestamo,
      idLibro: prestamo.idLibro,
      idUsuario: prestamo.idUsuario,
      fechaInicio: prestamo.fechaInicio,
      fechaFin: prestamo.fechaFin,
      fechaDevolucion: prestamo.fechaDevolucion
    });
  }

  actualizarPrestamo(prestamo: any) {
    this.adminService.actualizarPrestamo(prestamo.idPrestamo, prestamo).subscribe({
      next: () => {
        this.mensaje = 'Préstamo actualizado correctamente';
        this.resetFormulario();
        this.cargarPrestamos();
      },
      error: () => this.mensaje = 'Error al actualizar el préstamo'
    });
  }

  eliminarPrestamo(idPrestamo: number) {
    if (!confirm('¿Seguro que quieres eliminar este préstamo?')) return;

    this.adminService.eliminarPrestamo(idPrestamo).subscribe({
      next: () => {
        this.mensaje = 'Préstamo eliminado correctamente';
        this.cargarPrestamos();
      },
      error: () => this.mensaje = 'Error al eliminar el préstamo'
    });
  }

  resetFormulario() {
    this.prestamoForm.reset();
    this.modoEdicion = false;
  }

}
