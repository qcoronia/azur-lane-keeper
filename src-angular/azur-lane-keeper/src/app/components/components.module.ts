import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { HeaderComponent } from './header/header.component';
import { HeaderCountersComponent } from './header-counters/header-counters.component';
import { HeaderProfileComponent } from './header-profile/header-profile.component';
import { HomeBackgroundComponent } from './home-background/home-background.component';



@NgModule({
  declarations: [
    LoadingScreenComponent,
    SecretaryComponent,
    HeaderComponent,
    HeaderCountersComponent,
    HeaderProfileComponent,
    HomeBackgroundComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingScreenComponent,
    SecretaryComponent,
    HeaderComponent,
    HeaderCountersComponent,
    HeaderProfileComponent,
    HomeBackgroundComponent,
  ]
})
export class ComponentsModule { }
