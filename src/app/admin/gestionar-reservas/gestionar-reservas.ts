import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AdminService } from '../../services/admin-service';
import { ReservaResponseDto } from '../../models/reserva-responsedto';
import { LibroModel } from '../../models/libro-model';
import { UsuarioModel } from '../../models/usuario-model';

@Component({
  selector: 'app-gestionar-reservas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './gestionar-reservas.html',
  styleUrl: './gestionar-reservas.css',
})
export class GestionarReservasComponent implements OnInit {

  reservas: ReservaResponseDto[] = [];
  libros: LibroModel[] = [];
  usuarios: UsuarioModel[] = [];

  mensaje: string | null = null;
  modoEdicion = false;
  reservaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.reservaForm = this.fb.group({
      idReserva: [null],
      idLibro: ['', Validators.required],
      idUsuario: ['', Validators.required],
      fechaReserva: ['', Validators.required],
      activa: [true, Validators.required]
    });

    this.cargarReservas();
    this.cargarLibros();
    this.cargarUsuarios();
  }

  cargarReservas() {
    this.adminService.getReservas().subscribe({
      next: (data) => {
        console.log("RESERVAS:", data);
        this.reservas = data;
      },
      error: () => this.mensaje = 'Error al cargar las reservas'
    });
  }

  cargarLibros() {
    this.adminService.getLibros().subscribe({
      next: (data) => {
        this.libros = data;
      },
      error: () => this.mensaje = 'Error al cargar libros'
    });
  }

  cargarUsuarios() {
    this.adminService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: () => this.mensaje = 'Error al cargar usuarios'
    });
  }

  guardarReserva() {
    if (this.reservaForm.invalid) return;

    const form = this.reservaForm.value;

    const reserva = {
      idReserva: form.idReserva,
      idLibro: form.idLibro,
      idUsuario: form.idUsuario,
      fechaReserva: form.fechaReserva,
      activa: form.activa
    };

    console.log("RESERVA A ENVIAR:", reserva);

    if (this.modoEdicion) {
      this.actualizarReserva(reserva);
    } else {
      this.crearReserva(reserva);
    }
  }

  crearReserva(reserva: any) {
    this.adminService.crearReserva(reserva).subscribe({
      next: () => {
        this.mensaje = 'Reserva creada correctamente';
        this.resetFormulario();
        this.cargarReservas();
      },
      error: () => this.mensaje = 'Error al crear la reserva'
    });
  }

  cargarReservaParaEditar(reserva: ReservaResponseDto) {
    this.modoEdicion = true;

    this.reservaForm.patchValue({
      idReserva: reserva.idReserva,
      idLibro: reserva.idLibro,
      idUsuario: reserva.idUsuario,
      fechaReserva: reserva.fechaReserva,
      activa: reserva.activa
    });
  }

  actualizarReserva(reserva: any) {
    this.adminService.actualizarReserva(reserva.idReserva, reserva).subscribe({
      next: () => {
        this.mensaje = 'Reserva actualizada correctamente';
        this.resetFormulario();
        this.cargarReservas();
      },
      error: () => this.mensaje = 'Error al actualizar la reserva'
    });
  }

  cancelarReserva(idReserva: number) {
    if (!confirm('¿Seguro que quieres cancelar esta reserva?')) return;

    this.adminService.eliminarReserva(idReserva).subscribe({
      next: () => {
        this.mensaje = 'Reserva cancelada correctamente';
        this.cargarReservas();
      },
      error: () => this.mensaje = 'Error al cancelar la reserva'
    });
  }

  resetFormulario() {
    this.reservaForm.reset();
    this.modoEdicion = false;
  }

}
