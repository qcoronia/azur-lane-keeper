import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoadingScreenComponentModule } from './components/loading-screen/loading-screen-component.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    CoreModule,
    LoadingScreenComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
