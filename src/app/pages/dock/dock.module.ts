import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockComponent } from './dock.component';
import { DockRoutingModule } from './dock-routing.module';
import { DockGridModule } from 'src/app/components/dock-grid/dock-grid.module';



@NgModule({
  declarations: [DockComponent],
  imports: [
    CommonModule,
    DockRoutingModule,

    DockGridModule,
  ],
  exports: [DockComponent]
})
export class DockModule { }
