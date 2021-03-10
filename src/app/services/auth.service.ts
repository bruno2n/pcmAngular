import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;
  usuario: string | null | undefined

  constructor(private autenticacao: AngularFireAuth, private router: Router) {
    this.autenticacao.setPersistence('session')
      //this.authState = auth
      //console.log(this.authState)
    //}))
  }

  registerWithEmail(email: string, senha: string) {
    return this.autenticacao.createUserWithEmailAndPassword(email, senha).then((user => {      
      this.authState = user
    })).catch(error => {
      //console.log(error)
      throw error
    })
  }

  loginWithEmail(email: string, senha: string) {  
    return this.autenticacao.setPersistence('session').then(() => {
    return this.autenticacao.signInWithEmailAndPassword(email, senha).then((user => {
      //this.authState = user
      //console.log(this.authState)
      localStorage.setItem('user', JSON.stringify(user.user))
      localStorage.setItem('email', JSON.stringify(user.user?.email))
      localStorage.setItem('uid', JSON.stringify(user.user?.uid))
    })).catch(error => {
      //console.log(error)
      throw error
    })
    })
  }

  logout() {
    this.autenticacao.signOut()
    localStorage.removeItem('user')
    localStorage.removeItem('email')
    this.router.navigate(['/login'])
  }

}