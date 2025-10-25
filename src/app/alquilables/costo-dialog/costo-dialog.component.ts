import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-costo-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './costo-dialog.component.html',
  styleUrls: ['./costo-dialog.component.css'],
})
export class CostoDialogComponent implements OnInit {
  costo: number | null = null;
  loading = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<CostoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, unidad: string; tipo: string }
  ) {}

  ngOnInit(): void {
    // ✅ Inicializamos el formulario correctamente
    this.form = this.fb.group({
      dias: [1, [Validators.required, Validators.min(1)]],
    });
  }

  calcular(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const dias = this.form.value.dias;
    this.http
      .get<number>(
        `http://localhost:8080/api/alquilables/${this.data.id}/costo?dias=${dias}`
      )
      .subscribe({
        next: (res) => {
          this.costo = res;
          this.loading = false;
        },
        error: () => {
          alert('Error al calcular el costo');
          this.loading = false;
        },
      });
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
