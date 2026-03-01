import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroModel } from '../../models/libro-model';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aside-component.html'
})
export class AsideComponent implements OnChanges {

  @Input() libros: LibroModel[] = [];
  @Output() filterChange = new EventEmitter<{type: string, value: string | null}>();

  categorias: string[] = [];
  autores: string[] = [];

  selectedType: string = 'all';
  selectedValue: string | null = null;

  ngOnChanges() {
    this.categorias = [...new Set(this.libros.map(l => l.categoria))];
    this.autores = [...new Set(this.libros.map(l => l.autor))];
  }

  selectAll() {
    this.selectedType = 'all';
    this.selectedValue = null;
    this.filterChange.emit({ type: 'all', value: null });
  }

  selectCategoria(cat: string) {
    this.selectedType = 'categoria';
    this.selectedValue = cat;
    this.filterChange.emit({ type: 'categoria', value: cat });
  }
  
}