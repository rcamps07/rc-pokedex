import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'pokemon-list', component: PokemonListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
