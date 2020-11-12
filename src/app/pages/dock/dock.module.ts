import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockComponent } from './dock.component';
import { DockRoutingModule } from './dock-routing.module';



@NgModule({
  declarations: [DockComponent],
  imports: [
    CommonModule,
    DockRoutingModule,
  ],
  exports: [DockComponent]
})
export class DockModule { }
