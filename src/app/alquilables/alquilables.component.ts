import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-alquilables',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    NavbarComponent,
    RouterModule
  ],
  templateUrl: './alquilables.component.html',
  styleUrls: ['./alquilables.component.css'],
})
export class AlquilablesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'tipo',
    'marca',
    'disponible',
    'acciones',
  ];
  dataSource: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarAlquilables();
  }

  cargarAlquilables() {
    this.http
      .get<any[]>('http://localhost:8080/api/alquilables/listar')
      .subscribe({
        next: (data) => (this.dataSource = data),
        error: (err) => console.error('Error cargando alquilables', err),
      });
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que querés eliminar este elemento?')) {
      this.http
        .delete(`http://localhost:8080/api/alquilables/${id}`)
        .subscribe({
          next: () => {
            alert('Eliminado correctamente');
            this.cargarAlquilables();
          },
          error: (err) => console.error('Error eliminando', err),
        });
    }
  }
}
