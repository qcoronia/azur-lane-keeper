import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockGridComponent } from './dock-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { ResponsiveGridDirective } from 'src/app/directives/responsive-grid/responsive-grid.directive';



@NgModule({
  declarations: [DockGridComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  exports: [DockGridComponent],
})
export class DockGridModule { }
