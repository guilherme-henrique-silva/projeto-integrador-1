import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ConfiguracoesComponent } from './components/configuracoes/configuracoes.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { LaudosComponent } from './components/laudos/laudos.component';
import { ProgressoComponent } from './components/progresso/progresso.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "home",
        component: HomeComponent
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
        path: "perfil",
        component: PerfilComponent
    },
    {
        path: "configuracoes",
        component: ConfiguracoesComponent
    },
    {
        path: "consultas",
        component: ConsultasComponent
    },
    {
        path: "laudos",
        component: LaudosComponent
    },
    {
        path: "progresso",
        component: ProgressoComponent
    },
    {
        path: "**",
        redirectTo: "/404"
    }
];
