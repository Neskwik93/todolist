import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { CookieService } from "ngx-cookie-service";
import { AppService } from "./app.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    constructor(private _router: Router, private _cookieService: CookieService, private _appService: AppService) { }

    ngOnInit() {
        this._appService.testAuth().then(() => {
            this._router.navigate(['/home']);
        }).catch(err => this._router.navigate(['/login']))
    }
}
