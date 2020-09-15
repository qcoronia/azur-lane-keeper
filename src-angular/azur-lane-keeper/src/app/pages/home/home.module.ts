import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeBackgroundComponentModule } from 'src/app/components/home-background/home-background-component.module';
import { HeaderComponentModule } from 'src/app/components/header/header-component.module';
import { SecretaryComponentModule } from 'src/app/components/secretary/secretary-component.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,

    HomeBackgroundComponentModule,
    HeaderComponentModule,
    SecretaryComponentModule,
  ]
})
export class HomeModule { }
