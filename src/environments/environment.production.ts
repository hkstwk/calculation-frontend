export const environment = {
  production: false,
  auth0: {
    domain: 'hkstwk-prod.eu.auth0.com',
    clientId: 'YOUR_PRODUCTION_CLIENT_ID',
    redirectUri: window.location.origin,
    audience: 'https://api.yourdomain.com',
    apiUrl: 'https://api.yourdomain.com'
  }
};
