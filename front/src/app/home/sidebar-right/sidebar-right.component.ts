import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

import { AppService } from 'src/app/app.service';

import { Task } from 'src/app/models/models';

declare var $: any;

@Component({
    selector: 'app-sidebar-right',
    templateUrl: './sidebar-right.component.html',
    styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent implements OnInit {
    @Input() selectedTask: Task;
    @Output() eventDeleteTask: any = new EventEmitter();

    constructor(private _appService: AppService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        $('#sidebarRight').css('height', $(window).height());
        $(window).resize(function () {
            $('#sidebarRight').css('height', $(window).height());
        });
        $("#sidebarRight").sidebar({ side: "right" });
    }

    toggleRight() {
        $("#sidebarRight").trigger("sidebar:toggle");
    }

    open() {
        $("#sidebarRight").trigger("sidebar:open");
    }

    close() {
        $("#sidebarRight").trigger("sidebar:close");
    }

    deleteTask() {
        Swal.fire({
            title: 'Confirmez-vous la suppression ?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Confirmer'
        }).then((result) => {
            if (result.value) {
                this._appService.delete('tasks/delete/' + this.selectedTask.id).then(res => {
                    if (res.response) {
                        this.close();
                        this.eventDeleteTask.emit();
                    }
                });
            }
        })
    }

}
