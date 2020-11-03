import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderHomeButtonComponent } from './header-home-button.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderHomeButtonComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [HeaderHomeButtonComponent]
})
export class HeaderHomeButtonComponentModule { }
