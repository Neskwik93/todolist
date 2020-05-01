import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppService } from './app.service';

@Injectable()
export class HomeResolver implements Resolve<string> {
    constructor(private _appService: AppService) { }
    resolve(): Promise<any> {
        return forkJoin(
            this._appService.getTaskList()
        ).pipe(map(
            (data: any) => {
                return data[0];
            }
        )).toPromise();
    }
}