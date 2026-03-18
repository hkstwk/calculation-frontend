import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';
import {AuthService} from '@auth0/auth0-angular';
import {MockAuthService} from './services/mock.auth.service';

console.log(">>> USING E2E CONFIG <<<");

// Prevent tree-shaking so file replacements work
export const __keep = true;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(), // geen interceptor,
    // 🔥 Mock AuthService in e2e
    { provide: AuthService, useClass: MockAuthService }
  ]
};
