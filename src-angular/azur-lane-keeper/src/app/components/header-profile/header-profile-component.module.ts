import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderProfileComponent } from './header-profile.component';



@NgModule({
  declarations: [HeaderProfileComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderProfileComponent]
})
export class HeaderProfileComponentModule { }
