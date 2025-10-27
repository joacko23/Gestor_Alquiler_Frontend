import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { ReservasService } from '../../reservas.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-reserva-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    NavbarComponent,
  ],
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.css'],
})
export class ReservaFormComponent implements OnInit {
  form!: FormGroup;
  alquilables: any[] = [];
  isPorHora = false;

  constructor(
    private fb: FormBuilder,
    private reservasService: ReservasService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      alquilableId: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
    });

    this.cargarAlquilables();
  }

  cargarAlquilables(): void {
    this.http
      .get<any[]>('http://localhost:8080/api/alquilables/listar')
      .subscribe({
        next: (data) => (this.alquilables = data.filter((a) => a.disponible)),
        error: (err) => console.error('Error al cargar alquilables', err),
      });
  }

  onAlquilableChange(event: any): void {
    const selected = this.alquilables.find((a) => a.id === event.value);
    if (!selected) return;

    // ✅ Vehículos → por hora, Electrodomésticos → por día
    this.isPorHora = ['AUTO', 'MOTO', 'CAMION'].includes(selected.tipo);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const user = this.authService.getUserInfo?.();
    if (!user?.email) {
      alert('No se pudo identificar el usuario autenticado');
      return;
    }

    const { inicio, fin, alquilableId } = this.form.value;

    // ⏱ Aseguramos formato ISO correcto
    const formatearFecha = (fecha: any) => {
      if (!fecha) return null;
      const date = new Date(fecha);
      if (this.isPorHora) {
        // Agregamos hora seleccionada si no viene del picker de datetime
        return date.toISOString().slice(0, 16);
      }
      // Día completo: medianoche
      return `${date.toISOString().split('T')[0]}T00:00:00`;
    };

    const reservaData = {
      alquilableId,
      inicio: formatearFecha(inicio),
      fin: formatearFecha(fin),
      usuarioEmail: user.email,
    };

    this.reservasService.crear(reservaData).subscribe({
      next: () => {
        alert('✅ Reserva creada exitosamente');
        this.router.navigate(['/reservas']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al crear la reserva');
      },
    });
  }

  volver(): void {
    this.router.navigate(['/reservas']);
  }
}
