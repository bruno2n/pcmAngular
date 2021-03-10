import { IndexModel } from './../../index-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { UsuarioModel } from 'src/app/usuario-model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {
  usuario!:  UsuarioModel
  index!: IndexModel

  dadosUsuario: UsuarioModel[] = [];    
  dados!: UsuarioModel[];
    
  inputNome: string = ''
  inputSobrenome: string = ''
  inputZona: string = ''  

  constructor(public crudService: CrudService, private snackBar: MatSnackBar) { }
  
  ngOnInit() {
    this.carregarDados()
  }

  carregarDados() {    
    this.dados = []
    this.crudService.getAll('COLABORADORES/').subscribe((res: any[]) => {            
      this.dados = res
      console.log(res)
      //formatando dados: nome e sobrenome > primeira letra em maiúsculo. zona > tudo em minúsculo
      this.dados.map(e => {     
        console.log(e)
        //e.nome = e.nome?.replace(/"/gi, '').charAt(0).toUpperCase().concat((e.nome.toLowerCase()).slice(1))
        e.nome = e.nome?.replace(/"/gi, '').charAt(0).toUpperCase().concat(e.nome.slice(1))
        e.sobrenome = e.sobrenome?.replace(/"/gi, '').charAt(0).toUpperCase().concat(e.sobrenome.slice(1))
        e.zona = e.zona?.replace(/"/gi, '')        
      })
      //colocando o array em ordem alfabética
      this.dados.sort(function(a, b) {
        return (a.nome! > b.nome!) ? 1 : ((b.nome! > a.nome!) ? -1 : 0)
      })      
      //fazendo cópia do array com os dados dos usuários
      this.dadosUsuario = this.dados
    })   
  } 

  buscar() {    
    this.dados = []
    this.usuario = {}

    //colocando todas as strings em letras minúsculas para comparação
    this.dadosUsuario.map(a=>{      
      let aux1 = a.nome!.toLowerCase()
      let aux2 = this.inputNome.toLowerCase()      
      let aux3 = a.sobrenome!.toLowerCase()
      let aux4 = this.inputSobrenome.toLowerCase()      
      let aux5 = a.zona!.toLowerCase()
      let aux6 = this.inputZona.toLowerCase()
      
      if((aux1 == aux2) && (aux3 == aux4)) { 
        this.dados.push(a)       
        this.usuario = a        
      }else {
        if((aux1.includes(aux2)) && (aux3.includes(aux4)) && (aux5.includes(aux6))) {        
          this.dados.push(a)
        }
      }      
    }) 
  }

  limparDados() {
    //limpando dados dos campos da pesquisa e das variáveis
    this.inputNome = ''
    this.inputSobrenome = ''
    this.inputZona = ''
    this.usuario = {}
    this.dados = this.dadosUsuario
  }  

  cadastrar() {    
    this.usuario = {}
    this.usuario = {
      nome: this.inputNome.toLowerCase(),
      sobrenome: this.inputSobrenome.toLowerCase(),
      zona: this.inputZona.toLowerCase()
    }
    this.crudService.cadastrar(this.usuario)        
    this.limparDados()

    this.snackBar.open('Usuário cadastrado!', 'Fechar', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })       
  }

  excluir(key: string) {   
    this.crudService.delete('COLABORADORES', key)
    this.limparDados()
    
    this.snackBar.open('Usuário excluído!', 'Fechar', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }

  editar(item: UsuarioModel) {
    this.inputNome = item.nome!
    this.inputSobrenome = item.sobrenome!
    this.inputZona = item.zona!
    this.usuario = item
  }

  salvar2() {
    this.index = {}
    this.index.frota = this.inputNome
    this.index.zona = this.inputZona
    console.log(this.index)
    console.log()
    //console.log(this.dados)
    
    this.crudService.substituir2(this.inputNome, this.index)
    
  }

  exibir() {
    this.dados = []
    this.crudService.getAll('INDEX/').subscribe((res: any[]) => {            
      
      console.log(res)    
    
})
  }

}