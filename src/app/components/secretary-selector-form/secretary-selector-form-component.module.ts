import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SecretarySelectorFormComponent } from './secretary-selector-form.component';



@NgModule({
  declarations: [SecretarySelectorFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [SecretarySelectorFormComponent],
})
export class SecretarySelectorFormComponentModule { }
