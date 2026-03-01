import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:9012/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials
        ,{ withCredentials: true })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('rol', response.rol);
          localStorage.setItem('email', response.email);
        })
      );
  }

  logout() {
    localStorage.clear();
  }

  register(data: any) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, data);
  }



  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('rol');
  }

  isLogged(): boolean {
    return !!this.getToken();
  }
}