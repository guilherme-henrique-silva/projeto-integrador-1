import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { AvaliacoesComponent } from './components/avaliacoes/avaliacoes.component';
import { ProgressoComponent } from './components/progresso/progresso.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SigninComponent } from './components/signin/signin.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { AuthGuard } from './auth/auth.guard';
import { AvaliacaoComponent } from './components/avaliacao/avaliacao.component';

export const routes: Routes = [
    {
        path: "",
        component: WelcomeComponent
    },
    {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "404",
        component: PageNotFoundComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signin",
        component: SigninComponent
    },
    {
        path: "perfil",
        component: PerfilComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "consultas",
        component: ConsultasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "create/consulta",
        component: ConsultaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "edit/consulta/:id",
        component: ConsultaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "avaliacoes",
        component: AvaliacoesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "create/avaliacao",
        component: AvaliacaoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "edit/avaliacao",
        component: AvaliacaoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "progresso",
        component: ProgressoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        redirectTo: "/404"
    }
];
