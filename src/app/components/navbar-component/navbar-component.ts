import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { LibroService } from '../../services/libro-service';
import { LibroModel } from '../../models/libro-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private libroService: LibroService,
  ) {}

  terminoBusqueda: string = '';
  private libros: LibroModel[] = [];
  private librosFiltrados: LibroModel[] = [];

  ngOnInit() {
    this.libroService.getAll().subscribe(data => {
      this.libros = data;
      this.librosFiltrados = data; // Al inicio, se ven todos
    });
  }

  buscarLibro() {
    const term = this.terminoBusqueda.toLowerCase().trim();
    
    if (!term) {
      this.librosFiltrados = [...this.libros];
      return;
    }

    this.librosFiltrados = this.libros.filter(libro => 
      libro.titulo.toLowerCase().includes(term) || 
      libro.autor.toLowerCase().includes(term)
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
