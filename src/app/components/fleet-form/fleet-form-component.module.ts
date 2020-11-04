import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FleetFormComponent } from './fleet-form.component';



@NgModule({
  declarations: [FleetFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FleetFormComponent],
})
export class FleetFormComponentModule { }
