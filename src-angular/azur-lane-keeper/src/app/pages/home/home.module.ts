import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SecretaryComponentModule } from 'src/app/components/secretary/secretary-component.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,

    SecretaryComponentModule,
  ]
})
export class HomeModule { }
