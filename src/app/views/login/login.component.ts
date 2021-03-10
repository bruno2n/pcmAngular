import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    email: string = ''
    senha: string = ''
    error: {name: string, message: string} = {name: '', message: ''}
    errorMessage: string = ''

    constructor(private authservice: AuthService, private router: Router) { }

    login() {
        this.clearErrorMessage()
        if(this.validateForm(this.email, this.senha)) {
            this.authservice.loginWithEmail(this.email, this.senha).then(() => {
                this.router.navigate(['/'])
            }).catch(_error => {
                this.error = _error
                this.router.navigate(['/login'])       
            })
        }
    }

    criar() {
        this.clearErrorMessage()
        if(this.validateForm(this.email, this.senha)) {
            this.authservice.registerWithEmail(this.email, this.senha).then(() => {
                this.router.navigate(['/'])
            }).catch(_error => {
                this.error = _error
                this.router.navigate(['/login'])       
            })
        }
    }

    validateForm(email: string, senha: string) {
        if(email.length === 0) {
            this.errorMessage = 'Digite o email do usuário'
            return false
        }

        if(senha.length === 0) {
            this.errorMessage = 'Digite a senha do usuário'
            return false
        }

        this.errorMessage = ''
        return true
    }

    clearErrorMessage() {
        this.errorMessage = ''
        this.error = {name: '', message: ''}
    }

    logout() {
        this.authservice.logout()
    }
}
