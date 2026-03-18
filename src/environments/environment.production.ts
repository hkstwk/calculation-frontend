export const environment = {
  production: false,
  auth0: {
    enabled: true,
    domain: 'hkstwk-dev.eu.auth0.com',
    clientId: 'WrzInUOHu8t8veMHqhDiTDxtRnPIX7YA',
    redirectUri: window.location.origin,
    audience: 'http://localhost:8080',
    apiUrl: 'http://localhost:8080'
  }
};
