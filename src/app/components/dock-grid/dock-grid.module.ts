import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockGridComponent } from './dock-grid.component';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [DockGridComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  exports: [DockGridComponent]
})
export class DockGridModule { }
