import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'front';

    constructor(private _httpClient: HttpClient) {}

    ngOnInit() {
       this.getUsers();
    }   

    getUsers() {
        this._httpClient.get('http://localhost:3000/api/v1/users/1')
        .toPromise()
        .then(res => {
            console.log(res)
        });
    }
}
