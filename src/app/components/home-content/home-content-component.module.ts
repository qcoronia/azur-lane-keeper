import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeContentComponent } from './home-content.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HomeContentComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [HomeContentComponent],
})
export class HomeContentComponentModule { }
