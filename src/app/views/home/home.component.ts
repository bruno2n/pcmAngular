import { Component } from '@angular/core'; 
import { Router } from '@angular/router'
import { CrudService } from 'src/app/services/crud.service';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //showFiller = false;
  usuario: string | null | undefined
  nome: unknown
  sobrenome: unknown
  zona: unknown

  

  constructor(private authservice: AuthService, private router: Router, public crudService: CrudService) {    
    this.usuario = localStorage.getItem('uid')?.replace(/"/gi, '')
    console.log(this.usuario)
    this.crudService.getAll('COLABORADORES/' + this.usuario).subscribe(res => {
      this.nome = res[0]    
      //console.log(this.nome)
      this.sobrenome = res[1]
      //console.log(this.sobrenome)
      this.zona = res[2]
      //console.log(this.zona)
      //console.log(res)
    })
  }

  atualizar() {
    
    this.crudService.getAll('COLABORADORES/' + this.usuario).subscribe(res => {
      this.nome = res[0]
      console.log(this.nome)
      this.zona = res[1]
      console.log(this.zona)
      console.log(res.toString())
    })
  }

  logout() {
    this.authservice.logout()    
  }
}