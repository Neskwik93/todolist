import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AppService {
    urlServeur: string = 'http://localhost:3000/api/v1/';
    httpOptions: any = {}

    constructor(private _http: HttpClient, private _cookieService: CookieService) { }

    post(url: string, value: any) {
        this.addTokenHeader();
        return this._http.post(this.urlServeur + url, value, this.httpOptions)
            .toPromise()
            .then((res: any) => {
                return res;
            });
    }

    get(url: string) {
        this.addTokenHeader();
        return this._http.get(this.urlServeur + url, this.httpOptions)
            .toPromise()
            .then((res: any) => {
                return res;
            });
    }

    put(url: string, value: any) {
        this.addTokenHeader();
        return this._http.put(this.urlServeur + url, value, this.httpOptions)
            .toPromise()
            .then((res: any) => {
                return res;
            });
    }

    delete(url: string) {
        this.addTokenHeader();
        return this._http.delete(this.urlServeur + url, this.httpOptions)
            .toPromise()
            .then((res: any) => {
                return res;
            });
    }

    testAuth() {
        this.addTokenHeader();
        return this._http.get(this.urlServeur + 'users/testAuth', this.httpOptions)
            .toPromise()
            .then((res: any) => {
                return res;
            });
    }

    addTokenHeader() {
        let token = this._cookieService.get('token');
        if (token) {
            this.httpOptions.headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'x-auth': token
            })
        } else {
            this.httpOptions.headers = new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }

    getTaskList() {
        return new Promise((resolve, reject) => {
            this.get('taskList').then(res => {
                if (res.response) {
                    res.response.forEach(taskList => {
                        taskList.new = false;
                    });
                }
                resolve(res);
            }).catch(err => reject(err));
        });
    }
}