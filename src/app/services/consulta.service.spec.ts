import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ConsultaService } from './consulta.service';

describe('ConsultaService', () => {
  let service: ConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
