import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SecretaryComponentModule } from 'src/app/components/secretary/secretary-component.module';
import { FooterComponentModule } from 'src/app/components/footer/footer-component.module';
import { RightSidebarComponentModule } from 'src/app/components/right-sidebar/right-sidebar-component.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,

    SecretaryComponentModule,
    RightSidebarComponentModule,
    FooterComponentModule,
  ]
})
export class HomeModule { }
