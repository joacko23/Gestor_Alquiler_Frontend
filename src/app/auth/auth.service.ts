import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  /** 🔹 Login */
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          sessionStorage.setItem('jwt', res.token);
        })
      );
  }

  /** 🔹 Registro */
  register(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, { email, password })
      .pipe(
        tap((res) => {
          sessionStorage.setItem('jwt', res.token);
        })
      );
  }

  /** 🔹 Obtener token */
  getToken(): string | null {
    return sessionStorage.getItem('jwt');
  }

  /** 🔹 Saber si el usuario está autenticado */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** 🔹 Logout */
  logout(): void {
    sessionStorage.removeItem('jwt');
  }
}
