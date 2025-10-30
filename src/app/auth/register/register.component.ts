import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password, confirmPassword } = this.form.value;
    if (password !== confirmPassword) {
      this.snackBar.open('⚠️ Las contraseñas no coinciden', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-warning'],
      });
      return;
    }

    this.authService.register(email, password).subscribe({
      next: () => {
        this.snackBar.open('✅ Registro exitoso. Sesión iniciada.', 'Cerrar', {
          duration: 2500,
          panelClass: ['snackbar-success'],
        });
        this.router.navigate(['/alquilables']);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open(
          err.error?.message || '❌ Error al registrar usuario',
          'Cerrar',
          {
            duration: 3000,
            panelClass: ['snackbar-error'],
          }
        );
      },
    });
  }

  volver() {
    this.router.navigate(['/login']);
  }
}
