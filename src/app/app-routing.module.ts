import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControleComponent } from './components/controle/controle.component';
import { EquipamentosComponent } from './components/equipamentos/equipamentos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PreventivasComponent } from './components/preventivas/preventivas.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { FormEquipamentoComponent } from './components/equipamentos/form-equipamento/form-equipamento.component';
import { FormUsuarioComponent } from './components/usuarios/form-usuario/form-usuario.component';
import { DadosEquipamentosComponent } from './components/equipamentos/dados-equipamentos/dados-equipamentos.component';

const routes: Routes = [
  { path: "", component: HomeComponent,
    children: [    
    { path: "", component: DashboardComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "controle", component: ControleComponent },
    { path: "equipamentos", component: EquipamentosComponent },
    { path: "usuarios", component: UsuariosComponent },
    { path: "preventivas", component: PreventivasComponent },
    { path: "form-equipamento", component: FormEquipamentoComponent },
    { path: "form-usuario", component: FormUsuarioComponent },
    { path: "dados", component: DadosEquipamentosComponent }
    ],
    canActivate: [AuthGuard]
  },  
  { path: "", component: LoginComponent,
    children: [
    { path: "", redirectTo: 'login', pathMatch: 'full' },
    { path: "login", component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }