import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar-module';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login/login';
import { Dashboard } from './components/dashboard/dashboard/dashboard';
import { Score } from './components/score/score/score';
import { Register } from './components/register/register/register';
import { NgIcon } from "@ng-icons/core";

@NgModule({
  declarations: [
    App,
    Login,
    Dashboard,
    Score,
    Register
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    NavbarModule,
    NgIcon
],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
