import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Navbar } from './components/navbar/navbar';

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


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'nav', component: Navbar },

  { path: 'itScoreboard', component: ItScore },
  { path: 'businessScoreboard', component: BusinessScore },
  { path: 'healthcareScoreboard', component: HealthcareScore },
  { path: 'legalScoreboard', component: LegalScore },
  { path: 'constructionScoreboard', component: ConstructionScore },
  { path: 'governmentScoreboard', component: GovernmentScore },
  { path: 'designScoreboard', component: DesignScore },
  { path: 'educationScoreboard', component: EducationScore },
  { path: 'financeScoreboard', component: FinanceScore },
  { path: 'tourismScoreboard', component: TourismScore },

  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
