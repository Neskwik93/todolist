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

    constructor(private _cookieService: CookieService, private _appService: AppService, private _router: Router) { }

    ngOnInit() {
    }

    login() {
        if(this.user.password && this.user.email) {
            this._appService.post('users/login', this.user).then(res => {
                if(res.token) {
                    this._cookieService.set('token', res.token);
                    this._router.navigate(['/home']);
                }
                //TODO: gestion d'erreur
            });
        } else {
            //TODO: gestion d'erreur
        }
    }

    switchMode() {
        this.registerMode = !this.registerMode;
        this.user = new User({});
    }

    register() {
        if(this.user.password && this.user.email && this.user.password === this.passwordConf && this.user.email === this.emailConf) {
            this._appService.post('users/register', this.user).then(res => {
                if(res.response) {
                    this._cookieService.set('token', res.response.token);
                }
                //TODO: gestion d'erreur
            });
        } else {
            // TODO: gestion d'erreur
        }
    }
}
