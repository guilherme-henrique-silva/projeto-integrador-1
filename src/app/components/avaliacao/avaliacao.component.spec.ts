import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AvaliacaoComponent } from './avaliacao.component';

describe('AvaliacaoComponent', () => {
  let component: AvaliacaoComponent;
  let fixture: ComponentFixture<AvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacaoComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
