import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LibroModel } from '../../models/libro-model';
import { ActivatedRoute } from '@angular/router';
import { LibroService } from '../../services/libro-service';

@Component({
  selector: 'app-book-detai-component',
  standalone: true,
  templateUrl: './book-detail-component.html',
  imports: [CommonModule]
})
export class BookDetailComponent implements OnInit {

  libro?: LibroModel;

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.libroService.getById(id)
      .subscribe(data => this.libro = data);
  }
}
