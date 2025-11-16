import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressoComponent } from './progresso.component';
import { AuthService } from '../../auth/auth.service';
import { AvaliacaoService } from '../../services/avaliacao.service';
import { Router } from '@angular/router';

describe('ProgressoComponent', () => {
  let component: ProgressoComponent;
  let fixture: ComponentFixture<ProgressoComponent>;

  let authServiceMock: jasmine.SpyObj<AuthService>;
  let avaliacaoServiceMock: jasmine.SpyObj<AvaliacaoService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['getUserId', 'getUserRole', 'getToken']);
    avaliacaoServiceMock = jasmine.createSpyObj('AvaliacaoService', ['getAvaliacoes', 'getAvaliacao', 'addAvaliacao', 'updateAvaliacao', 'deleteAvaliacao ']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ProgressoComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: AvaliacaoService, useValue: avaliacaoServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getSeverity should return the severity of the last evaluation', () => {
    component.chart.data = [
      ['2025-05-25 17:54:18', 5],
      ['2025-06-01 10:30:00', 6],
      ['2025-06-15 14:15:45', 5],
      ['2025-07-01 09:00:00', 7],
      ['2025-07-20 11:45:30', 8],
    ];
    const severity = component.getSeverity();
    expect(severity).toBe(8);
  });
});
