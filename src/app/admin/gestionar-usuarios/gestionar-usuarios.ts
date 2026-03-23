import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { AdminService } from '../../services/admin-service';
import { UsuarioModel } from '../../models/usuario-model';

@Component({
  selector: 'app-gestionar-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './gestionar-usuarios.html',
  styleUrl: './gestionar-usuarios.css',
})
export class GestionarUsuariosComponent implements OnInit {

  usuarios: UsuarioModel[] = [];

  mensaje: string | null = null;
  modoEdicion = false;
  usuarioForm!: FormGroup;

  roles = ['ADMIN', 'USER'];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      idUsuario: [null],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      activo: [true, Validators.required],
      password: [''], // solo en creación
    });

    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.adminService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log("USUARIOS:", data);
      },
      error: () => this.mensaje = 'Error al cargar los usuarios'
    });
  }

  guardarUsuario() {
    console.log("FORM VALUE:", this.usuarioForm.value);

    if (this.usuarioForm.invalid) return;

    const form = this.usuarioForm.value;

    const usuario = {
      idUsuario: form.idUsuario,
      nombre: form.nombre,
      apellidos: form.apellidos,
      email: form.email,
      rol: form.rol,
      password: form.password
    };

    if (this.modoEdicion) {
      this.actualizarUsuario(usuario);
    } else {
      this.crearUsuario(usuario);
    }
  }

  crearUsuario(usuario: any) {
    this.adminService.crearUsuario(usuario).subscribe({
      next: () => {
        this.mensaje = 'Usuario creado correctamente';
        this.resetFormulario();
        this.cargarUsuarios();
      },
      error: () => this.mensaje = 'Error al crear el usuario'
    });
  }

  cargarUsuarioParaEditar(usuario: UsuarioModel) {
    this.modoEdicion = true;

    this.usuarioForm.patchValue({
      idUsuario: usuario.idUsuario,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      email: usuario.email,
      rol: usuario.rol,
      password: '' // no se muestra la contraseña
    });
  }

  actualizarUsuario(usuario: any) {
    this.adminService.actualizarUsuario(usuario.idUsuario, usuario).subscribe({
      next: () => {
        this.mensaje = 'Usuario actualizado correctamente';
        this.resetFormulario();
        this.cargarUsuarios();
      },
      error: () => this.mensaje = 'Error al actualizar el usuario'
    });
  }

  eliminarUsuario(idUsuario: number) {
    if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;

    this.adminService.eliminarUsuario(idUsuario).subscribe({
      next: () => {
        this.mensaje = 'Usuario eliminado correctamente';
        this.cargarUsuarios();
      },
      error: () => this.mensaje = 'Error al eliminar el usuario'
    });
  }

  resetFormulario() {
    this.usuarioForm.reset();
    this.modoEdicion = false;
  }

}

