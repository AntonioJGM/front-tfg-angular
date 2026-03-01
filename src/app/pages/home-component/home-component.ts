import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroService } from '../../services/libro-service';
import { LibroModel } from '../../models/libro-model';
import { AsideComponent } from '../../components/aside-component/aside-component';
import { BookListComponent } from '../../components/book-list-component/book-list-component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AsideComponent, BookListComponent],
  templateUrl: './home-component.html'
})
export class HomeComponent implements OnInit {

  libros: LibroModel[] = [];
  filteredLibros: LibroModel[] = [];

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.libroService.getAll().subscribe(data => {
      this.libros = data;
      this.filteredLibros = data;
    });
  }

  applyFilter(event: {type: string, value: string | null}) {

    if (event.type === 'all') {
      this.filteredLibros = this.libros;
    }

    if (event.type === 'categoria') {
      this.filteredLibros = this.libros
        .filter(l => l.categoria === event.value);
    }

    if (event.type === 'autor') {
      this.filteredLibros = this.libros
        .filter(l => l.autor === event.value);
    }
  }
}
