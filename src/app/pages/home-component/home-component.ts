import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookCardComponent } from '../../components/book-card-component/book-card-component';
import { LibroService } from '../../services/libro-service';
import { LibroModel } from '../../models/libro-model';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BookListComponent } from '../../components/book-list-component/book-list-component';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css'], 
  imports: [CommonModule, RouterModule, BookListComponent],
  standalone: true
})
export class HomeComponent implements OnInit {

  libros$!: Observable<LibroModel[]>;
  categorias: string[] = ['Autores', 'Categorías'];
  searchTerm: string = '';

  indicesLibros: number[] = [];
  indicesCategorias: number[] = [];

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    // Cargar libros

    this.libros$ = this.libroService.getAll();
  }
}
