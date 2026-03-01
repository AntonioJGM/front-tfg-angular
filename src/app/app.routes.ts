import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component';
import { BookDetailComponent } from './pages/book-detail-component/book-detail-component';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './components/login-component/login-component';
import { authGuard } from './guards/auth-guard';

export const appConfig = {
  providers: [
    provideHttpClient()
  ]
};

export const routes: Routes = [

  { path: '', component: HomeComponent, canActivate: [authGuard] },

  { path: 'login', component: LoginComponent },

  /*{
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' }
  },

  {
    path: 'mis-prestamos',
    component: MisPrestamosComponent,
    canActivate: [authGuard]
  }*/
];
