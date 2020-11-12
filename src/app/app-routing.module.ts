import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule) },
  { path: 'formation', loadChildren: () => import('./pages/formation/formation.module').then(mod => mod.FormationModule) },
  { path: 'dock', loadChildren: () => import('./pages/dock/dock.module').then(mod => mod.DockModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
