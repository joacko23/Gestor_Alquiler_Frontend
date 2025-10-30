import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.http
      .post<{ token: string }>(
        'http://localhost:8080/api/auth/login',
        this.form.value
      )
      .subscribe({
        next: (res) => {
          sessionStorage.setItem('jwt', res.token);
          this.snackBar.open('✅ Login exitoso', 'Cerrar', {
            duration: 2500,
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['/alquilables']);
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('❌ Error al iniciar sesión', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        },
      });
  }
}
