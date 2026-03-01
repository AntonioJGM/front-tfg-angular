import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LibroService } from '../../services/libro-service';
import { LibroModel } from '../../models/libro-model';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail-component.html',
  styleUrls: ['./book-detail-component.css']
})
export class BookDetailComponent implements OnInit {

  libro?: LibroModel;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.libroService.getById(id).subscribe({
      next: (data) => {
        this.libro = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}