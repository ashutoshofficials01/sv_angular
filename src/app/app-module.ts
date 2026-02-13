import { CUSTOM_ELEMENTS_SCHEMA, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar-module';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Register } from './components/register/register';
import { NgIcon } from "@ng-icons/core";

import { ItScore } from './components/scoreboard/itScore/itScore';
import { BusinessScore } from './components/scoreboard/businessScore/businessScore';
import { HealthcareScore } from './components/scoreboard/healthcareScore/healthcareScore';
import { LegalScore } from './components/scoreboard/legalScore/legalScore';
import { ConstructionScore } from './components/scoreboard/constructionScore/constructionScore';
import { GovernmentScore } from './components/scoreboard/governmentScore/governmentScore';
import { DesignScore } from './components/scoreboard/designScore/designScore';
import { EducationScore } from './components/scoreboard/educationScore/educationScore';
import { FinanceScore } from './components/scoreboard/financeScore/financeScore';
import { TourismScore } from './components/scoreboard/tourismScore/tourismScore';


@NgModule({
  declarations: [
    App,
    Login,
    Dashboard,
    ItScore,
    BusinessScore,
    HealthcareScore,
    LegalScore,
    ConstructionScore,
    GovernmentScore,
    DesignScore,
    EducationScore,
    FinanceScore,
    TourismScore,
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
  bootstrap: [App],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
