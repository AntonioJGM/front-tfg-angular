import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibroModel } from '../../models/libro-model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  templateUrl: './book-card-component.html',
  imports: [RouterModule]
})
export class BookCardComponent {
  @Input() libro!: LibroModel;
}
