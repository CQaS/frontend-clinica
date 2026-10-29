import { Routes } from '@angular/router';
import { Login } from './auth/login/login'; // <-- Apuntamos al nuevo componente modular
import { MisTurnosPaciente } from './paciente/mis-turnos';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';
import { ReservarTurnoPaciente } from './paciente/reservar-turno';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  // Redirección inicial → Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  // ---------- PACIENTE ----------
  {
    path: 'paciente',
    canActivate: [roleGuard],
    data: { role: 'PACIENTE' },
    children: [
      { path: 'mis-turnos', component: MisTurnosPaciente },
      { path: 'reservar', component: ReservarTurnoPaciente },
      { path: '', redirectTo: 'mis-turnos', pathMatch: 'full' },
    ],
  },

  // ---------- MÉDICO ----------
  {
    path: 'medico',
    canActivate: [roleGuard],
    data: { role: 'MEDICO' },
    children: [
      { path: 'mis-turnos', component: MisTurnosPaciente },
      { path: '', redirectTo: 'mis-turnos', pathMatch: 'full' },
    ],
  },

  // ---------- ADMINISTRADOR ----------
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent,
    canActivate: [roleGuard],
    data: { role: 'ADMINISTRADOR' }
  },

  // Ruta comodín para redirigir URLs mal escritas al login
  { path: '**', redirectTo: 'login' }
];