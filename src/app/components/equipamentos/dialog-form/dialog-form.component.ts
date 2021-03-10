import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css']
})
export class DialogFormComponent implements OnInit {
  public formulario!: FormGroup

  constructor(public dialogRef: MatDialogRef<DialogFormComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
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

  cancelar(): void {
    this.dialogRef.close();
  }

}
