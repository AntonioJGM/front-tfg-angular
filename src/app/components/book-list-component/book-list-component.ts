import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibroService } from '../../services/libro-service';
import { LibroModel } from '../../models/libro-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './book-list-component.html',
  styleUrls: ['./book-list-component.css']
})
export class BookListComponent {

  libros = signal<LibroModel[]>([]);

  constructor(private libroService: LibroService) {}

  ngOnInit() {
    this.libroService.getAll().subscribe({
      next: (data) => this.libros.set(data),
      error: (err) => console.error('Error al cargar libros:', err)
    });
  };

};