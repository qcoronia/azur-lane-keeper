import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoadingScreenComponentModule } from './components/loading-screen/loading-screen-component.module';
import { HomeBackgroundComponentModule } from './components/home-background/home-background-component.module';
import { HeaderComponentModule } from './components/header/header-component.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    CoreModule,
    LoadingScreenComponentModule,
    HomeBackgroundComponentModule,
    HeaderComponentModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
