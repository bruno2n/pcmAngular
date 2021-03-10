import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FrotaModel } from 'src/app/frota-model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-preventivas',
  templateUrl: './preventivas.component.html',
  styleUrls: ['./preventivas.component.css']
})

export class PreventivasComponent implements OnInit {
  equipamento: FrotaModel = {
    frota: '',
    ano: '',
    fabricante: '',
    horimetro: '',
    modelo: '',
    status: '',
    serie: '',
    lotacao: '',
    ultprev: '', 
    horimetroAtual: ''
  }  

  dadosEquipamento: FrotaModel[] = [];    
  dados!: FrotaModel[];
  
  btExcluir = false
  
  
  inputFrota: string = ''
  inputSobrenome: string = ''
  inputZona: string = ''
  
  auxFrota: string = ''
  auxSobrenome: string = ''
  auxZona: string = '' 

  constructor(public crudService: CrudService, private snackBar: MatSnackBar) { }
  
  ngOnInit() {
    this.carregarDados()
  }

  carregarDados() {    
    this.dados = []
    this.crudService.getAll('FROTA/zona0/').subscribe((res: any[]) => {            
      this.dados = res
      console.log(res)
      //formatando dados: nome e sobrenome > primeira letra em maiúsculo. zona > tudo em minúsculo
      this.dados.map(e => {     
        //e.nome = e.nome?.replace(/"/gi, '').charAt(0).toUpperCase().concat((e.nome.toLowerCase()).slice(1))
        e.frota = e.frota?.replace(/"/gi, '')
        e.ano = e.ano?.replace(/"/gi, '')
        e.fabricante = e.fabricante?.replace(/"/gi, '')
        e.horimetro = e.horimetro?.replace(/"/gi, '')
        e.horimetroAtual = e.horimetroAtual?.replace(/"/gi, '')
        e.prev350 = parseInt(e.horimetro!) + 350
        e.timer = e.prev350 - parseInt(e.horimetroAtual!)               
      })
      //colocando o array em ordem alfabética
      /*this.dados.sort(function(a, b) {
        return (a.nome! > b.nome!) ? 1 : ((b.nome! > a.nome!) ? -1 : 0)
      })*/     
      //fazendo cópia do array com os dados dos usuários
      this.dadosEquipamento = this.dados
    })   
  } 

  buscar() {
    let find = false    
    this.dados = []

    //colocando todas as strings em letras minúsculas para comparação
    this.dadosEquipamento.map(a=>{      
      let aux1 = a.frota!.toLowerCase()
      let aux2 = this.inputFrota.toLowerCase()      
      let aux3 = a.ano!.toLowerCase()
      let aux4 = this.inputSobrenome.toLowerCase()      
      let aux5 = a.fabricante!.toLowerCase()
      let aux6 = this.inputZona.toLowerCase()

      if((aux1.includes(aux2)) && (aux3.includes(aux4)) && (aux5.includes(aux6))) {        
        find = true        
        this.dados.push(a)
      }
    })    

    if(!find){     
      this.dados = this.dadosEquipamento
      this.limparDados()

      this.snackBar.open('Usuário não cadastrado!', 'Fechar', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      })
    }      
  }

  limparDados() {
    //limpando dados dos campos da pesquisa e das variáveis
    this.inputFrota = ''
    this.inputSobrenome = ''
    this.inputZona = ''
    this.equipamento = {}
    this.dados = this.dadosEquipamento
  }  

  cadastrar() {    
    this.equipamento = {}
    this.equipamento = {
      frota: this.inputFrota.toLowerCase(),
      ano: this.inputSobrenome.toLowerCase(),
      fabricante: this.inputZona.toLowerCase()
    }
    //this.crudService.cadastrar(this.equipamento)    
    this.equipamento = {}
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

  editar(nome: string, sobrenome: string, zona: string, key: string) {
    this.inputFrota = nome
    this.inputSobrenome = sobrenome
    this.inputZona = zona    
    this.equipamento.frota = key    
    
    this.auxFrota = nome
    this.auxSobrenome = sobrenome
    this.auxZona = zona 

    this.btExcluir = true
  }

}