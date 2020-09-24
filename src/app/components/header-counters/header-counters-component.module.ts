import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderCountersComponent } from './header-counters.component';



@NgModule({
  declarations: [HeaderCountersComponent],
  imports: [
    CommonModule,
  ],
  exports: [HeaderCountersComponent]
})
export class HeaderCountersComponentModule { }
