import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login-component',
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
  imports: [FormsModule]
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({
      username: this.email,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['']),
      error: () => alert('Credenciales incorrectas')
    });
  }
}