import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzurLaneApiService } from './azurlane-api/azurlane-api.service';
import { ConfigService } from './config/config.service';
import { DatabaseService, dbConfig } from './database/database.service';
import { AppService } from './app/app.service';
import { SecretaryService } from './secretary/secretary.service';
import { ShipgirlService } from './shipgirl/shipgirl.service';
import { CacheService } from './cache/cache.service';
import { NgxIndexedDBModule } from 'ngx-indexed-db';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,

    NgxIndexedDBModule.forRoot(dbConfig),
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
        CacheService,
        DatabaseService,
        SecretaryService,
        ShipgirlService,
      ],
    };
  }

}
