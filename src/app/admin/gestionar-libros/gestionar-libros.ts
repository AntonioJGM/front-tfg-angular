import { Component, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin-service';
import { LibroModel } from '../../models/libro-model';

@Component({
  selector: 'app-gestionar-libros',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './gestionar-libros.html',
  styleUrls: ['./gestionar-libros.css']
})
export class GestionarLibrosComponent {
  libros: LibroModel[] = [];
  mensaje: string | null = null;
  modoEdicion = false;
  libroForm!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.libroForm = this.fb.group({
      idLibro: [null],
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      editorial: ['', Validators.required],
      categoria: ['', Validators.required],
      isbn: ['', Validators.required],
      disponible: [true],
      imagen: [''],
      descripcion: ['']
    });

    this.cargarLibros();
  }

  //cargar los libros
  cargarLibros() {
    this.adminService.getLibros().subscribe({
      next: (data) => {
        this.libros = data;
      },
      error: () => {
        this.mensaje = 'Error al cargar los libros';
      }
    });
  }
    
  guardarLibro() {
    if (this.libroForm.invalid) return;

    const dto = this.libroForm.value;

    if (this.modoEdicion) {
      this.actualizarLibro(dto);
    } else {
      this.crearLibro(dto);
    }
  }

  crearLibro(dto: any) {
    this.adminService.crearLibro(dto).subscribe({
      next: () => {
        this.mensaje = 'Libro creado correctamente';
        this.resetFormulario();
        this.cargarLibros();
      },
      error: () => this.mensaje = 'Error al crear el libro'
    });
  }

  cargarLibroParaEditar(libro: LibroModel) {
    this.modoEdicion = true;
    this.libroForm.patchValue(libro);
  }

  actualizarLibro(dto: any) {
    if (!dto.idLibro) return;

    this.adminService.actualizarLibro(dto.idLibro, dto).subscribe({
      next: () => {
        this.mensaje = 'Libro actualizado correctamente';
        this.resetFormulario();
        this.cargarLibros();
      },
      error: () => this.mensaje = 'Error al actualizar el libro'
    });
  }

 eliminarLibro(idLibro: number) {
  if (!confirm('¿Seguro que quieres eliminar este libro?')) return;

  this.adminService.eliminarLibro(idLibro).subscribe({
    next: () => {
      this.mensaje = 'Libro eliminado correctamente';
      this.cargarLibros(); // ← AÑADIR ESTO
    },
    error: () => this.mensaje = 'Error al eliminar el libro'
  });
}

  resetFormulario() {
    this.libroForm.reset({
      disponible: true
    });
    this.modoEdicion = false;
  }
}

