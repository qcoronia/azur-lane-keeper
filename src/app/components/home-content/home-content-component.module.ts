import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeContentComponent } from './home-content.component';



@NgModule({
  declarations: [HomeContentComponent],
  imports: [
    CommonModule
  ],
  exports: [HomeContentComponent],
})
export class HomeContentComponentModule { }
