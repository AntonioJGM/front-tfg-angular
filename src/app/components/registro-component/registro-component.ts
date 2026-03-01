import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms'; 
import { AuthService } from '../../services/auth-service'; 
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro-component',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './registro-component.html',
  styleUrl: './registro-component.css',
})
export class RegistroComponent {
  
  form!: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {} 

  ngOnInit() { 
    this.form = this.fb.group({ 
      nombre: ['', Validators.required], 
      apellidos: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required] 
    }); 
  } 
  
  register() { 
    this.authService.register(this.form.value).subscribe({ 
      next: (res) => { 
        alert(res.message); 
        this.router.navigate(['/login']); 
      }, 
      error: (err) => { 
        alert(err.error.message); 
      } 
    });
  }


}
