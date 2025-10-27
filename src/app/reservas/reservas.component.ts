import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { ReservasService } from './reservas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    NavbarComponent,
  ],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
})
export class ReservasComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'usuarioEmail',
    'alquilableMarca',
    'inicio',
    'fin',
    'costoTotal',
    'acciones',
  ];

  dataSource: any[] = [];

  constructor(
    private reservasService: ReservasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservasService.listar().subscribe({
      next: (data) => (this.dataSource = data),
      error: (err) => console.error('Error cargando reservas', err),
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que querés cancelar esta reserva?')) {
      this.reservasService.eliminar(id).subscribe({
        next: () => {
          alert('Reserva cancelada correctamente');
          this.cargarReservas();
        },
        error: (err) => console.error('Error al eliminar reserva', err),
      });
    }
  }

  nuevaReserva(): void {
    this.router.navigate(['/reservas/nueva']);
  }
}
