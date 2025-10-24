import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../layout/navbar/navbar.component';

@Component({
  selector: 'app-edit-alquilable',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule,
    NavbarComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  cancelar() {
    this.router.navigate(['/alquilables']);
  }
  onToggleChange(event: any) {
    // Pequeño delay para permitir la animación visual
    setTimeout(() => {
      this.form.patchValue({ disponible: event.checked });
    }, 150);
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      marca: ['', Validators.required],
      disponible: [true],
    });

    this.cargarAlquilable();
  }

  cargarAlquilable() {
    this.http
      .get<any>(`http://localhost:8080/api/alquilables/${this.id}`)
      .subscribe({
        next: (data) => {
          this.form.patchValue({
            marca: data.marca,
            disponible: data.disponible,
          });
        },
        error: (err) => console.error('Error cargando alquilable', err),
      });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.http
      .put(`http://localhost:8080/api/alquilables/${this.id}`, this.form.value)
      .subscribe({
        next: () => {
          alert('Alquilable actualizado correctamente');
          this.router.navigate(['/alquilables']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar el alquilable');
        },
      });
  }
}
