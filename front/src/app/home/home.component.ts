import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        $('#sidebarLeft').css('height', $(window).height());
        $(window).resize(function () {
            $('#sidebarLeft').css('height', $(window).height());
        });
        $("#sidebarLeft").sidebar({ side: "left" });
    }

    toggleLeft() {
        $("#sidebarLeft").trigger("sidebar:toggle");
        if($("#btnSideBarLeft").position().left === 0) {
            $("#btnSideBarLeft").animate({ left: "+=200" }, 200);
        } else {
            $("#btnSideBarLeft").animate({ left: "-=200" }, 200);
        }
        console.log($("#btnSideBarLeft").position().left)
    }

}
