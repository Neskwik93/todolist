import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
    ttTaskDisplayed: Task[];
    selectedTask: Task;
    title: string = 'Pas de liste séléctionée';
    mode: string = 'c';
    obsInit: Subscription;


    constructor(private _appService: AppService, private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.obsInit = this._activatedRoute.data.subscribe(res => {
            if (res.taskList.response) {
                this.ttTaskList = res.taskList.response;
            }
        });
    }

    ngOnDestroy() {
        this.obsInit.unsubscribe();
    }

    switchMode(mode: string) {
        this.mode = mode;
        this.setDisplayedTasks();
    }

    setDisplayedTasks() {
        this.ttTaskDisplayed = this.mode === 'c' ? this.ttTask.filter(t => !t.completed) : this.ttTask.filter(t => t.completed);
    }

    getTasks(event: any) {
        this.ttTask = event.ttTasks;
        this.taskList = event.taskList;
        this.title = event.taskList.name;
        this.mode = 'c';
        this.setDisplayedTasks();
    }

    selectTask(task: Task) {
        this.selectedTask = task;
        this.sidebarRightComponent.open();
    }

    completeTask(task: Task) {
        task.completed = !task.completed;
        this._appService.put('tasks', task).then(res => {
            if (res.response) {
                this.setDisplayedTasks();
            }
        });
    }

    addTask() {
        let newTask: Task = new Task({
            task_list_id: this.taskList.id,
            short_desc: 'Nom de la tâche',
            long_desc: 'Description de la tâche',
            end_date: new Date().toISOString().split('T')[0],
            new: true
        });
        this.ttTask.push(newTask);
        this.setDisplayedTasks();
    }

    cancelAdd(task) {
        let id = this.ttTask.findIndex(t => t === task);
        this.ttTask.splice(id, 1);
        this.setDisplayedTasks();
    }

    saveTask(newTask: Task) {
        this._appService.post('tasks', newTask).then(res => {
            if (res.response) {
                newTask.new = false;
                newTask.id = res.response.newId;
                this.setDisplayedTasks();
            }
        });
    }

    deleteTask() {
        this.ttTask = this.ttTask.filter(t => t.id !== this.selectedTask.id);
        this.selectedTask = null;
        this.sidebarRightComponent.close();
        this.setDisplayedTasks();
    }
}
