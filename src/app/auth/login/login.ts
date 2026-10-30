import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { LoginApiClient } from '../../servicios/login-api.service';
import { AuthStore } from '../auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordModule, ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  private readonly loginApiClient: LoginApiClient = inject(LoginApiClient);
  private readonly authStore: AuthStore = inject(AuthStore);
  private readonly messageService: MessageService = inject(MessageService);

  form: FormGroup = this.fb.group({
    email: new FormControl(null, Validators.required),
    clave: new FormControl(null, Validators.required),
  });

  iniciarSesion() {
    if (this.form.invalid) return;

    this.loginApiClient.login(this.form.value).subscribe({
      next: (res: any) => {
        this.authStore.guardarToken(res.accessToken);
        this.router.navigateByUrl('/paciente');
      },
      error: (err: any) => {
        console.error('Error al iniciar sesión:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Usuario o contraseña incorrectos',
        });
      },
    });
  }
}
