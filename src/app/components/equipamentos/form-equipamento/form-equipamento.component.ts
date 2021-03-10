import { CrudService } from './../../../services/crud.service';
import { FormModel } from 'src/app/form-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';




@Component({
  selector: 'app-form-equipamento',
  templateUrl: './form-equipamento.component.html',
  styleUrls: ['./form-equipamento.component.css']
})
export class FormEquipamentoComponent implements OnInit {    
  public formulario!: FormGroup
  title: string = 'teste'
  nome: string = ''
  usuario: string = ''
  senha: string = ''
  id = ''

  constructor( private location: Location, private crudService: CrudService,private fb: FormBuilder) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      frota: ['', [Validators.required]],
      fabricante: ['', [Validators.required]],
      ano: ['', [Validators.required]],
      horimetro: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      lotacao: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  cadastrar() {}

  editar() {}
  
  exibir() {
    console.log('teste')
  }
  
}
