import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderProfileComponentModule as HeaderProfileComponentModule } from '../header-profile/header-profile-component.module';
import { HeaderCountersModule as HeaderCountersComponentModule } from '../header-counters/header-counters-component.module';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,

    HeaderProfileComponentModule,
    HeaderCountersComponentModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderComponentModule { }
