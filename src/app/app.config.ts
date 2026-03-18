import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authHttpInterceptorFn, provideAuth0} from '@auth0/auth0-angular';
import {environment} from '../environments/environment';

console.log(">>> USING NORMAL CONFIG <<<");

// Prevent tree-shaking so file replacements work
export const __keep = true;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri,
        audience: environment.auth0.audience
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.auth0.apiUrl}/*`,
            tokenOptions: {
              authorizationParams: {
                audience: environment.auth0.audience,
              }
            }
          }
        ]
      }
    })
  ]
};
