import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockGridControlsComponent } from './dock-grid-controls.component';



@NgModule({
  declarations: [DockGridControlsComponent],
  imports: [
    CommonModule
  ],
  exports: [DockGridControlsComponent]
})
export class DockGridControlsModule { }
