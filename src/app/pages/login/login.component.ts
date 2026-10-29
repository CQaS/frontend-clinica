import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div style="max-width: 400px; margin: 80px auto; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); background: #fff;">
      <h2 style="text-align: center; margin-bottom: 20px;">Iniciar Sesión - Clínica Médica</h2>
      
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500;">Correo Electrónico:</label>
          <input type="email" formControlName="email" placeholder="correo&#64;ejemplo.com" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;" />
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 8px; font-weight: 500;">Contraseña:</label>
          <input type="password" formControlName="clave" placeholder="••••••••" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;" />
        </div>

        <p style="color: #dc3545; margin-bottom: 15px; font-size: 14px;" *ngIf="errorMessage">{{ errorMessage }}</p>

        <button type="submit" [disabled]="loginForm.invalid" style="width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
          Ingresar
        </button>
      </form>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = '';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        // Validación obligatoria de negocio: estado ACTIVO
        if (res.usuario.estado !== 'ACTIVO') {
          this.errorMessage = 'Acceso denegado: El usuario no se encuentra activo.';
          this.authService.logout();
          return;
        }

        // Redirección según el rol de la clínica
        const rol = res.usuario.rol;
        if (rol === 'ADMINISTRADOR') {
          this.router.navigate(['/admin-dashboard']);
        } else if (rol === 'MEDICO') {
          this.router.navigate(['/medico/mis-turnos']);
        } else if (rol === 'PACIENTE') {
          this.router.navigate(['/paciente/mis-turnos']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        this.errorMessage = 'Credenciales incorrectas o error al conectar con el servidor.';
      }
    });
  }
}