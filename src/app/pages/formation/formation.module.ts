import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationRoutingModule } from './formation-routing.module';
import { FormationComponent } from './formation.component';
import { FleetFormComponentModule } from 'src/app/components/fleet-form/fleet-form-component.module';



@NgModule({
  declarations: [FormationComponent],
  imports: [
    CommonModule,
    FormationRoutingModule,
    FleetFormComponentModule,
  ]
})
export class FormationModule { }
