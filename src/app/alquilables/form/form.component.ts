import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

@Component({
  selector: 'app-alquilable-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    NavbarComponent
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  tipos = ['AUTO', 'MOTO', 'CAMION', 'ELECTRODOMESTICO'];
  form!: FormGroup; // ✅ Se declara primero

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      tipo: ['', Validators.required],
      marca: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { tipo, marca } = this.form.value;

    this.http
      .post(
        `http://localhost:8080/api/alquilables/crear?tipo=${tipo}&marca=${marca}`,
        {}
      )
      .subscribe({
        next: () => {
          alert('Alquilable creado correctamente');
          this.router.navigate(['/alquilables']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al crear el alquilable');
        },
      });
  }
}
