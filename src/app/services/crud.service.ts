import { FrotaModel } from './../frota-model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { UsuarioModel } from '../usuario-model';
import { IndexModel } from '../index-model';

@Injectable({
  providedIn: 'root'
})

export class CrudService {    
  constructor(public db: AngularFireDatabase) { }
  opened = false
  
  insert(frota: FrotaModel) {
    this.db.list("FROTA/zona0/").push(frota).then((result: any) => {
      console.log(result.key)
    })
  }

  substituir(address: string, frota: FrotaModel) {
    this.db.list("FROTA/zona0/").set(address, frota)      
  }

  substituir2(address: string, frota: IndexModel) {
    this.db.list("INDEX/").set(address, frota)      
  }

  cadastrar(usuario: UsuarioModel) {
    this.db.list(`COLABORADORES/`).push(usuario).then((result: any) => {
      console.log(result.key)
      usuario.key = result.key
      let a = result.key
      console.log(usuario)
      this.db.list('COLABORADORES/').update(a, usuario )
    })
  }

  update(frota: FrotaModel, key: string) {
    this.db.list("FROTA/").update(key, frota).catch((error: any) => {
      console.error(error)
    })
  }
  
  getAll(address: string) {
      return this.db.list(address).valueChanges()
  }

  getOne(address: string) {
      return this.db.list(address).snapshotChanges()
  }
  
  getObject(address: string) {
      return this.db.object('FROTA/' + address).valueChanges()
    }
  /*
  getAll() {
    return this.db.list("FROTA")
    .snapshotChanges()
    .pipe(
        map(changes=>{
          return changes.map(data=> ({key: data.payload.key, ...data.payload.child}))
        })
    )
  }

*/
mudar() {
  this.opened = !this.opened
}


delete(address: string, key: string) {
  this.db.object(`${address}/${key}`).remove()
}  
  
}
