import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../app.service';

import { User } from '../models/models';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user: User = new User({});
    registerMode: boolean = false;
    passwordConf: string;
    emailConf: string;
    messageError: string;

    constructor(private _cookieService: CookieService, private _appService: AppService, private _router: Router) { }

    ngOnInit() {
    }

    login() {
        this.messageError = null;
        if (this.user.password && this.user.email) {
            this._appService.post('users/login', this.user).then(res => {
                if (res.response) {
                    this._cookieService.set('token', res.response.token);
                    this._router.navigate(['/home']);
                } else {
                    this.messageError = res.error;
                }
            });
        } else {
            this.messageError = 'les deux champs sont obligatoires'
        }
    }

    switchMode() {
        this.messageError = null;
        this.registerMode = !this.registerMode;
        this.user = new User({});
    }

    register() {
        this.messageError = null;
        if (this.user.password && this.user.email && this.user.password === this.passwordConf && this.user.email === this.emailConf) {
            this._appService.post('users/register', this.user).then(res => {
                if (res.response) {
                    this._cookieService.set('token', res.response.token);
                    this.registerMode = false;
                    this.user = new User({});
                } else {
                    this.messageError = res.error;
                }
            });
        } else {
            if (this.user.password !== this.passwordConf) {
                this.messageError = 'Le mot de passe et sa confirmation ne correspondent pas';
            } else if (this.user.email !== this.emailConf) {
                this.messageError = 'Le mail et sa confirmation ne correspondent pas';
            } else {
                this.messageError = 'Les champs email, confirmation d\'email, mot de passe et confirmation de mot de passe sont obligatoires';
            }
        }
    }
}
