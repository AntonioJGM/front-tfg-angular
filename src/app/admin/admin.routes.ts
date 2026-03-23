import { Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel';
import { GestionarLibrosComponent } from './gestionar-libros/gestionar-libros';
import { GestionarPrestamosComponent } from './gestionar-prestamos/gestionar-prestamos';
import { GestionarUsuariosComponent } from './gestionar-usuarios/gestionar-usuarios';
import { GestionarReservasComponent } from './gestionar-reservas/gestionar-reservas';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      { path: 'libros', component: GestionarLibrosComponent },
      { path: 'prestamos', component: GestionarPrestamosComponent },
      { path: 'usuarios', component: GestionarUsuariosComponent },
      { path: 'reservas', component: GestionarReservasComponent }
    ]
  }
];
