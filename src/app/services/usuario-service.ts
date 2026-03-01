import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario-model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:9012/usuario';

  constructor(private http: HttpClient) {}

  getAll(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.apiUrl}/byId/${id}`);
  }

  create(usuario: any): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.apiUrl}/create`, usuario);
  }

  update(id: number, usuario: any): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>(`${this.apiUrl}/update/${id}`, usuario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}