import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MisTurnosPaciente } from './paciente/mis-turnos';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';

export const routes: Routes = [
  // Redirección inicial → Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // ---------- PACIENTE ----------
  {
    path: 'paciente',
    //canActivate: [AuthGuard], // control de acceso a rutas privadas
    children: [
      { path: 'mis-turnos', component: MisTurnosPaciente },
      { path: 'reservar', component: MisTurnosPaciente },
      { path: '', redirectTo: 'mis-turnos', pathMatch: 'full' },
    ],
  },

  /* // ---------- MÉDICO ----------
  {
    path: 'medico',
    canActivate: [AuthGuard], // control de acceso a rutas privada
    children: [
      { path: 'mis-turnos', component: MedicoMisTurnosComponent },
      { path: '', redirectTo: 'mis-turnos', pathMatch: 'full' },
    ],
  },*/

  // ---------- ADMINISTRADOR ----------
  { path: 'admin-dashboard', 
    component: AdminDashboardComponent
  },

];
