import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard/dashboard';
import { Login } from './components/login/login/login';
import { Score } from './components/score/score/score';
import { Register } from './components/register/register/register';
import { Navbar } from './components/navbar/navbar';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'login', component: Login },
  { path: 'scoreboard', component: Score },
  { path: 'register', component: Register },
  { path: 'nav', component: Navbar },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
