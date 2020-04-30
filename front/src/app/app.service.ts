import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {
    urlServeur: string = 'http://localhost:3000/api/v1/';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private _http: HttpClient) { }
    
    post(url: string, value: any) {
        value = JSON.stringify(value);
        return this._http.post(this.urlServeur + url, value, this.httpOptions)
            .toPromise()
            .then((res: any) => {
                if (res.response) {
                    return res;
                } else return true;
            });
    }
}