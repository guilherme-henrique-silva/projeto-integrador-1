import { Component, OnInit } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [TopNavbarComponent],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent implements OnInit {
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.redirectNotAuthorized();
  }

  role: string = 'psicologo';

  redirectNotAuthorized() {
    if (this.role !== 'psicologo') {
      this.router.navigate(['not-authorized']);
    }
  }
}
