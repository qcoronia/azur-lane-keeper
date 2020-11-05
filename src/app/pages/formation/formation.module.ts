import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationRoutingModule } from './formation-routing.module';
import { FormationComponent } from './formation.component';
import { FleetListComponentModule } from 'src/app/components/fleet-list/fleet-list-component.module';
import { FleetFormComponentModule } from 'src/app/components/fleet-form/fleet-form-component.module';



@NgModule({
  declarations: [FormationComponent],
  imports: [
    CommonModule,
    FormationRoutingModule,
    FleetListComponentModule,
    FleetFormComponentModule,
  ]
})
export class FormationModule { }
