import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

// Importações dos componentes baseados na sua imagem
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { AvaliacoesComponent } from './components/avaliacoes/avaliacoes.component';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';
import { ProgressoComponent } from './components/progresso/progresso.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AvaliacaoFormComponent } from './components/avaliacao-form/avaliacao-form.component';
import { AvaliacaoDetalheComponent } from './components/avaliacao-detalhe/avaliacao-detalhe.component';

export const routes: Routes = [
  // 1. Área Pública
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },

  // 2. Área Privada (Dashboard e Perfil)
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },

  // 3. Módulo de Consultas
  { path: 'consultas', component: ConsultasComponent, canActivate: [AuthGuard] },
  { path: 'create/consulta', component: ConsultaComponent, canActivate: [AuthGuard] },
  { path: 'edit/consulta/:id', component: ConsultaComponent, canActivate: [AuthGuard] },

  // 4. Módulo de Avaliações / Prontuário
  { path: 'avaliacoes', component: AvaliacoesComponent, canActivate: [AuthGuard] },
  { path: 'create/avaliacao', component: AvaliacaoFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/avaliacao/:id', component: AvaliacaoComponent, canActivate: [AuthGuard] },

  // 5. Relatórios e Evolução
  { path: 'progresso', component: ProgressoComponent, canActivate: [AuthGuard] },
  { path: 'avaliacao/:id', component: AvaliacaoDetalheComponent, canActivate: [AuthGuard] },
  // 6. Tratamento de Erros
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];