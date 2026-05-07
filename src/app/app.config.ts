import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Importação necessária
import { routes } from './app.routes';
import { authInterceptor } from './auth/auth.interceptor'; // Importe o seu interceptor

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Configuração vital para o Token JWT funcionar em todas as rotas /api
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};