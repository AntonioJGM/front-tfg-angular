import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibroModel } from '../models/libro-model';
import { UsuarioModel } from '../models/usuario-model';
import { PrestamoModel } from '../models/prestamo-model';
import { ReservaModel } from '../models/reserva-model';
import { RolModel } from '../models/rol-model';
import { PrestamoResponseDto } from '../models/prestamo-responsedto';
import { ReservaResponseDto } from '../models/reserva-responsedto';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private apiUrl = 'http://localhost:9012/admin';

  constructor(private http: HttpClient) {}

  //LIBROS
  getLibros(): Observable<LibroModel[]> {
  return this.http.get<LibroModel[]>(`${this.apiUrl}/libro/all`, { withCredentials: true });
  }


  crearLibro(dto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/libro/create`, dto, { withCredentials: true });
  }

  actualizarLibro(id: number, dto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/libro/update/${id}`, dto, { withCredentials: true });
  }

  eliminarLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/libro/delete/${id}`, { withCredentials: true });
  }

 
  // USUARIOS
  getUsuarios(): Observable<UsuarioModel[]> {
  return this.http.get<UsuarioModel[]>(`${this.apiUrl}/usuario/all`, { withCredentials: true });
  }
  crearUsuario(dto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuario/create`, dto, { withCredentials: true });
  }

  actualizarUsuario(id: number, dto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuario/update/${id}`, dto, { withCredentials: true });
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuario/delete/${id}`, { withCredentials: true });
  }

  getUsuarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario/byId/${id}`, { withCredentials: true });
  }

 
  // PRÉSTAMOS
  getPrestamos(): Observable<PrestamoResponseDto[]> {
  return this.http.get<PrestamoResponseDto[]>(`${this.apiUrl}/prestamo/all`, { withCredentials: true });
  }
  
  crearPrestamo(dto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/prestamo/create`, dto, { withCredentials: true });
  }

  actualizarPrestamo(id: number, dto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/prestamo/update/${id}`, dto, { withCredentials: true });
  }

  eliminarPrestamo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/prestamo/delete/${id}`, { withCredentials: true });
  }

 
  // RESERVAS
  getReservas(): Observable<ReservaResponseDto[]> {
  return this.http.get<ReservaResponseDto[]>(`${this.apiUrl}/reserva/all`, { withCredentials: true });
  }
  
  crearReserva(dto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reserva/create`, dto, { withCredentials: true });
  }

  actualizarReserva(id: number, dto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reserva/update/${id}`, dto, { withCredentials: true });
  }

  eliminarReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reserva/delete/${id}`, { withCredentials: true });
  }

 
  // ROLES
  getRoles(): Observable<RolModel[]> {
    return this.http.get<RolModel[]>(`${this.apiUrl}/rol/all`, { withCredentials: true });
  }

  crearRol(nombreRol: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rol/create/${nombreRol}`, {}, { withCredentials: true });
  }

  actualizarRol(id: number, dto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/rol/update/${id}`, dto, { withCredentials: true });
  }

  eliminarRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/rol/delete/${id}`, { withCredentials: true });
  }
}

