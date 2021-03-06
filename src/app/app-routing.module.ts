import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {StatusDataComponent} from './status-data/status-data.component';
import { NationsComponent } from './main/nations/nations.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nations', component: NationsComponent},
  { path: 'status', component: StatusDataComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
