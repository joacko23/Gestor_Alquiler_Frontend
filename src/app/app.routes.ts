import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AlquilablesComponent } from './alquilables/alquilables.component';
import { FormComponent } from './alquilables/form/form.component';
import { authGuard } from './auth/auth.guard';
import { EditComponent } from './alquilables/edit/edit.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservaFormComponent } from './reservas/form/reserva-form/reserva-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'alquilables',
    component: AlquilablesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'alquilables/nuevo',
    component: FormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'alquilables/:id/editar',
    component: EditComponent,
    canActivate: [authGuard],
  },
  { path: 'reservas', component: ReservasComponent, canActivate: [authGuard] },
  {
    path: 'reservas/nueva',
    component: ReservaFormComponent,
    canActivate: [authGuard],
  },

];
