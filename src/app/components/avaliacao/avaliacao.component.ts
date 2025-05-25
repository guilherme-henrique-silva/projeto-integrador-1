import { Component } from '@angular/core';
import { AvaliacaoFormComponent } from '../avaliacao-form/avaliacao-form.component';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';

@Component({
  selector: 'app-avaliacao',
  imports: [TopNavbarComponent, AvaliacaoFormComponent],
  templateUrl: './avaliacao.component.html',
  styleUrl: './avaliacao.component.css'
})
export class AvaliacaoComponent {

}
