import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaModel } from '../models/reserva-model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'http://localhost:9012/reserva';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ReservaModel[]> {
    return this.http.get<ReservaModel[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<ReservaModel> {
    return this.http.get<ReservaModel>(`${this.apiUrl}/byId/${id}`);
  }

  create(reserva: any): Observable<ReservaModel> {
    const token = localStorage.getItem("token");
    return this.http.post<ReservaModel>(`${this.apiUrl}/create`, reserva,
      { headers: { Authorization: `Bearer ${token}` }}
    );
  }

  cancelar(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/cancelar`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}