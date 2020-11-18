import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoadingScreenComponentModule } from './components/loading-screen/loading-screen-component.module';
import { HomeBackgroundComponentModule } from './components/home-background/home-background-component.module';
import { HeaderComponentModule } from './components/header/header-component.module';
import { ResponsiveGridDirective } from './directives/responsive-grid/responsive-grid.directive';

@NgModule({
  declarations: [
    AppComponent,
    ResponsiveGridDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    CoreModule,
    LoadingScreenComponentModule,
    HomeBackgroundComponentModule,
    HeaderComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
