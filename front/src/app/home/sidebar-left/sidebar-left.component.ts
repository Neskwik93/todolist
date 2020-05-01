import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AppService } from 'src/app/app.service';
import { CookieService } from 'ngx-cookie-service';

import { TaskList } from 'src/app/models/models';

declare var $: any;

@Component({
    selector: 'app-sidebar-left',
    templateUrl: './sidebar-left.component.html',
    styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent implements OnInit {
    @Input() ttTaskList: TaskList[] = [];
    @Output() sendTasks: any = new EventEmitter();

    constructor(private _appService: AppService, private _cookieService: CookieService, private _router: Router) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        $('#sidebarLeft').css('height', $(window).height());
        $(window).resize(function () {
            $('#sidebarLeft').css('height', $(window).height());
        });
        $("#sidebarLeft").sidebar({ side: "left" });
        this.toggleLeft();
    }

    toggleLeft() {
        $("#sidebarLeft").trigger("sidebar:toggle");
        if ($("#btnSideBarLeft").position().left === 0) {
            $("#btnSideBarLeft").animate({ left: "+=13%" }, 200);
        } else {
            $("#btnSideBarLeft").animate({ left: "-=13%" }, 200);
        }
    }

    logOut() {
        this._cookieService.delete('token');
        this._router.navigate(['/login']);
    }

    getTasks(taskList: TaskList) {
        this._appService.get('tasks/getByTaskListId/' + taskList.id).then(result => {
            if(result.response) {
                this.sendTasks.emit({ ttTasks: result.response, taskList: taskList })
            }
        });
    }
    
    addList() {
        let newTaskList: TaskList = new TaskList({name: 'Nouvelle liste', newList: true});
        this.ttTaskList.push(newTaskList);
    }

    saveTaskList(newTaskList) {
        this._appService.post('taskList/add', newTaskList).then(res => {
            if(res.response) {
                newTaskList.newList = false;
                newTaskList.id = res.response.newId;
            }
        })
    }

    deleteList(taskListId: number) {
        Swal.fire({
            title: 'Toutes les tâches de cette liste seront supprimées',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Confirmer'
        }).then((result) => {
            if (result.value) {
                this._appService.delete('taskList/delete/' + taskListId).then(res => {
                    if (res.response) {
                        this.ttTaskList = this.ttTaskList.filter(taskList => taskListId !== taskList.id);
                    }
                });
            }
        })
    }

}
