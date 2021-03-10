import { Component } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { FrotaModel } from 'src/app/frota-model';
//import { stringify } from 'querystring';
//import { analyzeFile } from '@angular/compiler';


@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.css']
})
export class ControleComponent {

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
  
  frotaId!: string;
  campo!: string;
  dados!: FrotaModel[];  
  dadosSelecao!: FrotaModel[];  
  temp!: FrotaModel[];  
  indice = []
  _array: any[] = [];
  _start: number = 0
  _page: number = 10
  _pageAtual: number = 1
  
  _length!: number;
  _end!: number;
  _rest!: number;
  _pageTotal!: number;
  
  zona: string = 'zona0/'
  result!: number;
 
  teste: boolean = false
  editar: boolean = false

  title: string = 'Inserir'
  selecao: number = 0

  
  constructor(public crudService: CrudService) {
    //seleção das zonas no banco
    let i = 0
    this.crudService.getOne('/FROTA').subscribe(res => {      
      res.map(a => {
        //let i = 0
        //for(let i = 0; i<res.length; i++ ) {
        //for(let i in res) {
          this._array[i] = a.key
        console.log(this._array[i])
          i++
        //}  
          //this._array = a.key
          //console.log(a.key)
        })       
      })          
      console.log(this._array)
    this.carregar()    
  }

  carregar() {  
    this._start = 0
    this._pageAtual = 1
    this.selecao = 0
    
    //tamanho dos dados recuperados do banco
    this.crudService.getAll('FROTA/' + this.zona).subscribe((res: {}) => {      
      this._length = Object.keys(res).length      
      this.paginacao()
    })
  }

  avancar() {
    if(this._pageAtual >= this._pageTotal) {
      this._pageAtual = this._pageTotal
    }else {
      this._pageAtual++
      this._start += this._page
      this.paginacao()
    }
  }
  
  retornar() {
    if(this._pageAtual <= 1) {
      this._pageAtual = 1
    }else {
      this._pageAtual--
      this._start -= this._page
      this.paginacao()
    }

  }

  paginacao() {
    //total de páginas
    if(this._page < this._length) {
      this._pageTotal = (this._length - this._length % this._page) / this._page
      if(this._length % this._page != 0) {
        this._pageTotal++
      }
    }else {
      this._pageTotal = 1
    }
    //posições de início e fim da leitura no banco
    this._end = this._start + this._page
    this._rest = this._length - this._end
    if(this._rest < 0) {
      this._end = this._length
    }
  
    //console.log(`start: ${this._start}`)
    //console.log(`end: ${this._end}`)
    //console.log(`rest: ${this._rest}`)
    this.inicio()
  }
  
  inicio() {
    this.dados! = []
    this.crudService.getAll('FROTA/' + this.zona).subscribe((res: any[]) => {      
      if(this.selecao == 0) {
        this.dadosSelecao = res
      }
      //console.log(Object.keys(res))      
      for(let i = this._start; i<this._end; i++ ) {
        // console.log(Object.values(res[i]))        
        this.dados[i - this._start] = this.dadosSelecao[i]              
      }    
    
      this.dados.map(e => {        
        e.status = e.status?.replace(/"/gi, '')
        e.ultprev = e.ultprev?.replace(/"/gi, '')        
        e.horimetro = e.horimetro?.replace(/"/gi, '')        
        e.horimetroAtual = e.horimetroAtual?.replace(/"/gi, '')
        e.prev350 = parseInt(e.horimetro!) + 350
        e.prev1000 = parseInt(e.horimetro!) + 1000
        e.prev2000 = parseInt(e.horimetro!) + 2000
        e.timer = e.prev350 - parseInt(e.horimetroAtual!)
        //console.log(e.horimetroAtual)
        //console.log(e.timer)
      })
      
  })
      console.log('dados')
      console.log(this.dados)
  }

  buscar(select: number) {
    this.dadosSelecao = []
    this.temp = []

    //console.log(this.selecao)
    if(select != this.selecao) {

      if(select == 0) {
        this.selecao = 0
        this.carregar()
      }else{   
        this.crudService.getAll('FROTA/' + this.zona).subscribe((res: any[]) => {
          this.temp = res
          this.temp.map(a => {
            a.horimetro = a.horimetro?.replace(/"/gi, '')
            a.horimetroAtual = a.horimetroAtual?.replace(/"/gi, '')
        
          if(select == 1) {
              if (parseInt(a.horimetroAtual!) - parseInt(a.horimetro!) >= 350){
                this.dadosSelecao.push(a)
              }
            }else{
              if(select == 2) {
                if (parseInt(a.horimetroAtual!) - parseInt(a.horimetro!) > 300 && parseInt(a.horimetroAtual!) - parseInt(a.horimetro!) < 350){
                  this.dadosSelecao.push(a)              
                }
              }else{
                if (parseInt(a.horimetroAtual!) - parseInt(a.horimetro!) <= 300){
                  this.dadosSelecao.push(a)              
                }              
              }
            }
          })

          let aux = Object.keys(this.dadosSelecao).length
          //console.log(a.frota)
          //console.log(this._length)
          //console.log(this.dadosSelecao)
          this._start = 0
          this._pageAtual = 1
          
          if(aux > 0) {
            this._length = aux
            this.selecao = select
            this.paginacao()
          }

        })

      }
   
    }

  }


  imprimir(text: string, campo: string) {
    this.equipamento = {}
    this.temp = []
    this.crudService.getAll('FROTA/' + this.zona).subscribe((res: any[]) => {
      this.temp = res
      this.temp.map(a => {
        if (campo == 'frota' && text == a.frota) {
          let aux = JSON.stringify(a)
          this.equipamento = JSON.parse(aux)
          
            this.equipamento.status = this.equipamento.status?.replace(/"/gi, '')
            this.equipamento.ultprev = this.equipamento.ultprev?.replace(/"/gi, '')
            this.equipamento.horimetro = this.equipamento.horimetro?.replace(/"/gi, '')
            this.equipamento.horimetroAtual = this.equipamento.horimetroAtual?.replace(/"/gi, '')
            this.equipamento.prev350 = parseInt(this.equipamento.horimetro!) + 350
            this.equipamento.prev1000 =parseInt(this.equipamento.horimetro!) + 1000
            this.equipamento.prev2000 =parseInt(this.equipamento.horimetro!) + 1000
            this.equipamento.timer = this.equipamento.prev350 - parseInt(this.equipamento.horimetroAtual!)
        }        
      })      
    })
    //console.log(this.salvo)
    console.log(text)
    console.log(campo)
    //console.log(this.mp)
    
    console.log(this.dados)      
    console.log(this.equipamento)      
    
    
    if(campo == 'horimetro') {
      let a = parseInt(text)
      this.result = a + 350
      console.log(this.result)
    }
    this.teste = true
    //this.editar = true

}

salvar() {
  console.log(this.equipamento)
  console.log(this.frotaId)
  //console.log(this.dados)
  
  this.crudService.substituir(this.equipamento.frota!, this.equipamento)
  this.teste = false
}
  /*

  buscar(campo: string, address: string) {
    this.dados = []
    this.temp = []
    this.crudService.getAll('FROTA/' + this.zona).subscribe(res => {
      this.temp = res
      this.temp.forEach(a => {
        if (campo == 'frota' && a.frota == address) {
          this.dados.push(a)
        }
        if (campo == 'status' && a.status == address) {
          this.dados.push(a)
        }
          this.dados.map(e => {
            e.status = e.status.replace(/"/gi, '')
            e.ultprev = e.ultprev.replace(/"/gi, '')
            e.horimetro = e.horimetro.replace(/"/gi, '')
          })        
      })
    })
  }


calculo() {
  this.crudService.getAll('zona0/nMaquinas').subscribe(res => {
    let temp = []
    temp = Object.values(res)
    this._length = temp[0] 
    console.log(this._length)   
    //this._length = this._length.valueOf()
    //return this._length
  })
  
}


    imprimir(_input: string) {
      this.temp = []
      let address = ''   
      this._array.push(`${_input}/`)
      this._array.forEach(a => {
          address += a
      })
  
      this.crudService.getOne(`${address}/`).subscribe(res=> {
        for(let i in Object.keys(res)) {
          this.temp[i] = Object.keys(res)[i]
        }
  
        if(this.temp[0] == "ano"){
          this.frotaId = _input
          let _temp = ''
          _temp = JSON.stringify(res)
          this.frota = JSON.parse(_temp)
          this.frota.horimetro = this.frota.horimetro.replace(/"/gi,'')
          this.frota.status = this.frota.status.replace(/"/gi,'')
          this.frota.ultprev = this.frota.ultprev.replace(/"/gi,'')
          console.log(this.frota)        
        }
  
  
      console.log(_input)    
      console.log(this.temp)
      console.log(address)
        })
    }
  
    retornar() {  
      this.temp = []     
      let address = ''   
      this._array.pop()
      this._array.forEach(a => {
          address += a
      })
      this.teste = ''
  
      this.crudService.getOne(`${address}/`).subscribe(res=> {
        for(let i in Object.keys(res)) {
          this.temp[i] = Object.keys(res)[i]       
        }
      console.log(this.temp)
      console.log(address)
      })
  }*/

}
