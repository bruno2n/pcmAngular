import { AuthGuard } from './guard/auth.guard';
import { environment } from './../environments/environment';

import { AuthService } from './services/auth.service';
import { CrudService } from './services/crud.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button"
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import{ MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/auth";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { ControleComponent } from './components/controle/controle.component';
import { EquipamentosComponent } from './components/equipamentos/equipamentos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HomeComponent } from './views/home/home.component';
import { PreventivasComponent } from './components/preventivas/preventivas.component';
import { FormEquipamentoComponent } from './components/equipamentos/form-equipamento/form-equipamento.component';
import { FormUsuarioComponent } from './components/usuarios/form-usuario/form-usuario.component';
import { DialogFormComponent } from './components/equipamentos/dialog-form/dialog-form.component';
import { DadosEquipamentosComponent } from './components/equipamentos/dados-equipamentos/dados-equipamentos.component';

@NgModule({
  declarations: [           
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ControleComponent,
    EquipamentosComponent,
    UsuariosComponent,
    HomeComponent,
    PreventivasComponent,
    FormEquipamentoComponent,
    FormUsuarioComponent,
    DialogFormComponent,
    DadosEquipamentosComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSelectModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,  
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [MatDatepickerModule, MatNativeDateModule],
  providers: [CrudService, AuthService, AngularFireAuth, AuthGuard, DadosEquipamentosComponent, EquipamentosComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
