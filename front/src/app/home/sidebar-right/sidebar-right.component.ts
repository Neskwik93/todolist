import { Component, OnInit, Input } from '@angular/core';

import { Task } from 'src/app/models/models';

declare var $: any;

@Component({
    selector: 'app-sidebar-right',
    templateUrl: './sidebar-right.component.html',
    styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent implements OnInit {
    @Input() selectedTask: Task;

    constructor() { }

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

}
