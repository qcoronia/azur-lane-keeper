import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderProfileComponentModule } from '../header-profile/header-profile-component.module';
import { HeaderCountersComponentModule } from '../header-counters/header-counters-component.module';
import { HeaderHomeButtonComponentModule } from '../header-home-button/header-home-button-component.module';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,

    HeaderProfileComponentModule,
    HeaderCountersComponentModule,
    HeaderHomeButtonComponentModule
  ],
  exports: [HeaderComponent]
})
export class HeaderComponentModule { }
