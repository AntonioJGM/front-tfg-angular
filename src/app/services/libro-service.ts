import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibroModel } from '../models/libro-model';

@Injectable({ providedIn: 'root' })
export class LibroService {

  private apiUrl = 'http://localhost:9012/libro';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LibroModel[]> {
    return this.http.get<LibroModel[]>(`${this.apiUrl}/all`, { withCredentials: true });
  }

  getById(id: number): Observable<LibroModel> {
    return this.http.get<LibroModel>(`${this.apiUrl}/byId/${id}`);
  }

  create(libro: any): Observable<LibroModel> {
    return this.http.post<LibroModel>(`${this.apiUrl}/create`, libro);
  }

  update(id: number, libro: any): Observable<LibroModel> {
    return this.http.put<LibroModel>(`${this.apiUrl}/update/${id}`, libro);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}