import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { LaudosComponent } from './components/laudos/laudos.component';
import { ProgressoComponent } from './components/progresso/progresso.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SigninComponent } from './components/signin/signin.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

export const routes: Routes = [
    {
        path: "",
        component: WelcomeComponent
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
        path: "signin",
        component: SigninComponent
    },
    {
        path: "perfil",
        component: PerfilComponent
    },
    {
        path: "consultas",
        component: ConsultasComponent
    },
    {
        path: "create/consulta",
        component: ConsultaComponent
    },
    {
        path: "edit/consulta/:id",
        component: ConsultaComponent
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
        path: "not-authorized",
        component: NotAuthorizedComponent
    },
    {
        path: "**",
        redirectTo: "/404"
    }
];
