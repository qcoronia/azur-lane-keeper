import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderCountersComponent } from './header-counters.component';
import { HeaderCounterComponentModule as HeaderCounterItemComponentModule } from '../header-counter-item/header-counter-item-component.module';



@NgModule({
  declarations: [HeaderCountersComponent],
  imports: [
    CommonModule,
    HeaderCounterItemComponentModule,
  ],
  exports: [HeaderCountersComponent]
})
export class HeaderCountersModule { }
