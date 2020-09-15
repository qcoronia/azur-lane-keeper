import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderCounterItemComponent as HeaderCounterItemComponent } from './header-counter-item.component';



@NgModule({
  declarations: [HeaderCounterItemComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderCounterItemComponent],
})
export class HeaderCounterComponentModule { }
