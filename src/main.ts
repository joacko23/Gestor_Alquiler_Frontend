import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './app/auth/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Ruteo standalone
    provideHttpClient(withInterceptorsFromDi()), // Habilita interceptores
    provideAnimations(), // Requerido por Angular Material
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, // Interceptor JWT
  ],
}).catch((err) => console.error(err));
