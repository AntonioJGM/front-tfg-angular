import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component';
import { BookDetailComponent } from './pages/book-detail-component/book-detail-component';
import { RegistroComponent } from './components/registro-component/registro-component';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './components/login-component/login-component';
import { authGuard } from './guards/auth-guard';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario';

export const appConfig = {
  providers: [
    provideHttpClient()
  ]
};

export const routes: Routes = [

  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'book/:id', component: BookDetailComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'mis-prestamos', component: PerfilUsuarioComponent, canActivate: [authGuard]} 

  /*{
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' }
  }*/
];
