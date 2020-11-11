import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormationComponent } from './formation.component';
import { FleetFormComponent } from 'src/app/components/fleet-form/fleet-form.component';


const routes: Routes = [
  { path: '', component: FormationComponent, children: [
    { path: 'new', component: FleetFormComponent },
    { path: 'edit/:formationId', component: FleetFormComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }
