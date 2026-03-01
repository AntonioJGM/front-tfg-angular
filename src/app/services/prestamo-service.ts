import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrestamoModel } from '../models/prestamo-model';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  private apiUrl = 'http://localhost:9012/prestamo';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PrestamoModel[]> {
    return this.http.get<PrestamoModel[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<PrestamoModel> {
    return this.http.get<PrestamoModel>(`${this.apiUrl}/byId/${id}`);
  }

  create(prestamo: any): Observable<PrestamoModel> {
    return this.http.post<PrestamoModel>(`${this.apiUrl}/create`, prestamo);
  }

  devolver(id: number): Observable<PrestamoModel> {
    return this.http.put<PrestamoModel>(`${this.apiUrl}/${id}/devolver`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}