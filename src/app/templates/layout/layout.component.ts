import { Component, inject  } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStore } from '../../auth/auth.store';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  //styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {

  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router)

  cerrarSesion(): void {
    this.authStore.limpiar();
    this.router.navigateByUrl('/login')
  }
}