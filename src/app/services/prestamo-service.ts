import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrestamoModel } from '../models/prestamo-model';
import { PrestamoResponseDto } from '../models/prestamo-responsedto';

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

  getMisPrestamos():Observable<PrestamoResponseDto[]> {
    return this.http.get<PrestamoResponseDto[]>(`${this.apiUrl}/mis-prestamos`);
  }

  create(prestamo: any): Observable<PrestamoModel> {
    const token = localStorage.getItem("token");
    return this.http.post<PrestamoModel>(`${this.apiUrl}/create`, prestamo,
      { headers: { Authorization: `Bearer ${token}` }}
    );
  }

  devolver(id: number): Observable<PrestamoResponseDto> {
    return this.http.put<PrestamoResponseDto>(`${this.apiUrl}/devolver/${id}`,{});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}