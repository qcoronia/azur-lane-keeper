import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { SecretaryComponent } from './secretary/secretary/secretary.component';



@NgModule({
  declarations: [
    LoadingScreenComponent,
    SecretaryComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingScreenComponent,
    SecretaryComponent,
  ]
})
export class ComponentsModule { }
