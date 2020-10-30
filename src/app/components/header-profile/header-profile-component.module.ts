import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderProfileComponent } from './header-profile.component';
import { SecretarySelectorFormComponentModule } from '../secretary-selector-form/secretary-selector-form-component.module';



@NgModule({
  declarations: [HeaderProfileComponent],
  imports: [
    CommonModule,
    SecretarySelectorFormComponentModule,
  ],
  exports: [HeaderProfileComponent]
})
export class HeaderProfileComponentModule { }
