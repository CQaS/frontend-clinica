import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { LoginApiClient } from './login-api-cliente';
import { AuthStore } from '../auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordModule, ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly loginApiClient = inject(LoginApiClient);
  private readonly authStore = inject(AuthStore);
  private readonly messageService = inject(MessageService);

  form: FormGroup = this.fb.group({
    nombre: new FormControl(null, Validators.required),
    clave: new FormControl(null, Validators.required)
  });

  iniciarSesion() {
    if (this.form.invalid) return;

    this.loginApiClient.login(this.form.value).subscribe({
      next: (res: any) => {
        this.authStore.guardarToken(res.accessToken);
        this.router.navigateByUrl('/paciente');
      },
      error: (err: any) => {
        console.error('Error al iniciar sesión', err);
      }
    });
  }
}