import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CostoDialogComponent } from './costo-dialog/costo-dialog.component';

@Component({
  selector: 'app-alquilables',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    NavbarComponent,
    RouterLink,
    MatDialogModule,
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

  tipos = ['AUTO', 'MOTO', 'CAMION', 'ELECTRODOMESTICO'];

  filtros = {
    tipo: '',
    marca: '',
    disponible: '',
  };

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  abrirCostoDialog(item: any) {
  this.dialog.open(CostoDialogComponent, {
    width: '400px',
    data: { id: item.id, unidad: item.unidad, tipo: item.tipo },
  });

}
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

  buscar() {
    const params = [];
    if (this.filtros.tipo) params.push(`tipo=${this.filtros.tipo}`);
    if (this.filtros.marca) params.push(`marca=${this.filtros.marca}`);
    if (this.filtros.disponible !== '')
      params.push(`disponible=${this.filtros.disponible}`);

    const query = params.length ? `?${params.join('&')}` : '';

    this.http
      .get<any[]>(`http://localhost:8080/api/alquilables/buscar${query}`)
      .subscribe({
        next: (data) => (this.dataSource = data),
        error: (err) => console.error('Error en la búsqueda', err),
      });
  }

  limpiarFiltros() {
    this.filtros = { tipo: '', marca: '', disponible: '' };
    this.cargarAlquilables();
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
