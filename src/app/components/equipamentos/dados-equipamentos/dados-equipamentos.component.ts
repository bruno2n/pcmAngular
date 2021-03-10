import { EquipamentosComponent } from './../equipamentos.component';
import { Component, OnInit } from '@angular/core';
import { FrotaModel } from 'src/app/frota-model';
import { CrudService } from 'src/app/services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dados-equipamentos',
  templateUrl: './dados-equipamentos.component.html',
  styleUrls: ['./dados-equipamentos.component.css']
})
export class DadosEquipamentosComponent implements OnInit {
  equipamento!: FrotaModel

  dadosEquipamento: FrotaModel[] = [];    
  dadosEquipamento1: FrotaModel[] = [];    
  dados!: FrotaModel[];
  aux!: FrotaModel[];
  _array: any[] = [];
  _array1 = ["zona0", "zona1", "zona2", "zona3", "zona4", "zona5"]
  _array2: any[] = [];
  _length!: number
       
  inputFrota: string = ''
  inputSobrenome: string = ''
  inputZona: string = 'zona0'  
    
  constructor(public crudService: CrudService, private snackBar: MatSnackBar, public equipamentos: EquipamentosComponent) { }
  
  ngOnInit() {
    this.dados = []
    this.crudService.getOne('FROTA/').subscribe(res => { 
      console.log(res)
      res.map(a => {        
          this._array.push(a.key)        
        //console.log(a)         
      }) 
    })
    console.log(this.inputZona)       
  }

  carregarDados() {    
     this.equipamentos.carregarDados(this.inputZona)
  } 

  buscar() {        
    this.dados = []
    this.equipamento = {}

    //colocando todas as strings em letras minúsculas para comparação
    this.dadosEquipamento.map(a=>{      
      let aux1 = a.frota!.toLowerCase()
      let aux2 = this.inputFrota.toLowerCase()      
      let aux3 = a.ano!.toLowerCase()
      let aux4 = this.inputSobrenome.toLowerCase()      
      let aux5 = a.fabricante!.toLowerCase()
      let aux6 = this.inputZona.toLowerCase()

      if((aux1 == aux2) && (aux3 == aux4)) { 
        this.dados.push(a)       
        this.equipamento = a        
      }else {
        if((aux1.includes(aux2)) && (aux3.includes(aux4)) && (aux5.includes(aux6))) {        
          this.dados.push(a)
        }
      }      
    }) 
  }
  /*
  this.snackBar.open('Usuário não cadastrado!', 'Fechar', {
    duration: 2000,
    horizontalPosition: 'end',
    verticalPosition: 'top'
  })
  */

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

  editar(item: FrotaModel) {
    this.inputFrota = item.frota!
    this.inputSobrenome = item.ano!
    this.inputZona = item.fabricante!   
    this.equipamento = item
  }

  exibir(item: FrotaModel) {
    console.log(item)
  }

  /* código para o index
    this.dados = []
    this.crudService.getAll('FROTA/zona0/11111/').subscribe((res: any[]) => {      
      console.log(res)      
      
      this.equipamento = {
        ano: res[0],
        fabricante: res[1],
        frota: res[2]
      }
      this.dados.push(this.equipamento) */

}