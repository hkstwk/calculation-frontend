import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {authHttpInterceptorFn, provideAuth0} from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideAuth0({
        domain: 'hkstwk-dev.eu.auth0.com',
        clientId: 'WrzInUOHu8t8veMHqhDiTDxtRnPIX7YA',
        authorizationParams: {
          redirect_uri: window.location.origin,
          audience: 'http://localhost:8080',
        },
        httpInterceptor: {
          allowedList: [
            {
              uri: 'http://localhost:8080/*',
              tokenOptions: {
                authorizationParams: {
                  audience: 'http://localhost:8080'
                }
              }
            }
          ]
        }
      }
    )
  ]
};
