import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SidebarLeftComponent } from './home/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './home/sidebar-right/sidebar-right.component';

import { CookieService } from 'ngx-cookie-service';
import { AppService } from './app.service';

import { HomeResolver } from './app.resolver';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        SidebarLeftComponent,
        SidebarRightComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
    ],
    providers: [
        CookieService,
        AppService,
        HomeResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
