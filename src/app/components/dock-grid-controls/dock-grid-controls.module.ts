import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockGridControlsComponent } from './dock-grid-controls.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DockGridControlsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [DockGridControlsComponent]
})
export class DockGridControlsModule { }
