import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  let authGuard: AuthGuard;
  let authServiceMock: jasmine.SpyObj<AuthService> = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
  let routerMock: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthGuard],
      providers: [
      { provide: AuthService, useValue: authServiceMock },
      { provide: Router, useValue: routerMock }]
    }).compileComponents();

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should guard the route', () => {
    const result = authGuard.canActivate();
    expect(result).toBeDefined();
  });
});
