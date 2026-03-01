import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroModel } from '../../models/libro-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-list-component.html'
})
export class BookListComponent {

  @Input() libros: LibroModel[] = [];
}