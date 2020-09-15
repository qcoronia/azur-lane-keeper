import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeBackgroundComponent } from './home-background.component';



@NgModule({
  declarations: [HomeBackgroundComponent],
  imports: [
    CommonModule
  ],
  exports: [HomeBackgroundComponent]
})
export class HomeBackgroundComponentModule { }
