import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {authHttpInterceptorFn, provideAuth0} from '@auth0/auth0-angular';
import {environment} from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideAuth0({
        domain: 'hkstwk-dev.eu.auth0.com',
        clientId: 'WrzInUOHu8t8veMHqhDiTDxtRnPIX7YA',
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
      }
    )
  ]
};
