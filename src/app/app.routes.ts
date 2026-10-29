import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MisTurnosPaciente } from './paciente/mis-turnos';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard';
import { ReservarTurnoPaciente } from './paciente/reservar-turno';
import { roleGuard } from './guards/role.guard'; // <-- Importamos nuestro guard

export const routes: Routes = [
  // Redirección inicial → Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // ---------- PACIENTE ----------
  {
    path: 'paciente',
    canActivate: [roleGuard], // <-- Activamos el control de acceso
    data: { role: 'PACIENTE' }, // <-- Definimos el rol permitido
    children: [
      { path: 'mis-turnos', component: MisTurnosPaciente },
      { path: 'reservar', component: ReservarTurnoPaciente }, // Corregido para usar ReservarTurnoPaciente
      { path: '', redirectTo: 'mis-turnos', pathMatch: 'full' },
    ],
  },

  // ---------- MÉDICO ----------
  {
    path: 'medico',
    canActivate: [roleGuard],
    data: { role: 'MEDICO' },
    children: [
      { path: 'mis-turnos', component: MisTurnosPaciente }, // Cambiar por tu componente de médico cuando lo tengas
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