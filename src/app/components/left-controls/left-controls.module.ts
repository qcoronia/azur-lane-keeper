import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftControlsComponent } from './left-controls.component';



@NgModule({
  declarations: [LeftControlsComponent],
  imports: [
    CommonModule
  ],
  exports: [LeftControlsComponent]
})
export class LeftControlsModule { }
