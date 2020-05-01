import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './sidebar-right/sidebar-right.component';

import { AppService } from '../app.service';

import { TaskList, Task } from '../models/models';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    @ViewChild(SidebarRightComponent, { static: false }) sidebarRightComponent: SidebarRightComponent;

    ttTaskList: TaskList[] = [];
    taskList: TaskList;
    ttTask: Task[];
    selectedTask: Task;
    title: string = 'Pas de liste séléctionée'
    obsInit: Subscription;


    constructor(private _appService: AppService, private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.obsInit = this._activatedRoute.data.subscribe(res => {
            console.log(res)
            if (res.taskList.response) {
                this.ttTaskList = res.taskList.response;
            }
        });
    }

    ngOnDestroy() {
        this.obsInit.unsubscribe();
    }

    getTasks(event: any) {
        console.log(event)
        this.ttTask = event.ttTasks;
        this.taskList = event.taskList;
        this.title = event.taskList.name;
    }

    selectTask(task: Task) {
        this.selectedTask = task;
        this.sidebarRightComponent.open();
    }

    addTask() {

    }
}
