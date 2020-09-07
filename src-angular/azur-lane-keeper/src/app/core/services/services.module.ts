import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzurLaneApiService } from './azurlane-api/azurlane-api.service';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './database/database.service';
import { AppService } from './app/app.service';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ],
})
export class ServicesModule {

  public static forRoot(): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [
        AppService,
        AzurLaneApiService,
        ConfigService,
        DatabaseService,
      ],
    };
  }

}
