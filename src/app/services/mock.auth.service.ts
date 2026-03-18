import {of} from 'rxjs';

export class MockAuthService {
  isAuthenticated$ = of(true);
  user$ = of({ name: 'E2E User' });
  loginWithRedirect() {}
  logout() {}
}
