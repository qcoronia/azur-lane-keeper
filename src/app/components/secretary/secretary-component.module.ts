import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretaryComponent } from './secretary.component';



@NgModule({
  declarations: [SecretaryComponent],
  imports: [
    CommonModule
  ],
  exports: [SecretaryComponent]
})
export class SecretaryComponentModule { }
