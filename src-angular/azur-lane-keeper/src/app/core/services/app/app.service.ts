import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { AzurLaneApiService } from '../azurlane-api/azurlane-api.service';
import { ConfigService } from '../config/config.service';
import { tap, switchMap } from 'rxjs/operators';
import { SecretaryService } from '../secretary/secretary.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private database: DatabaseService,
    private api: AzurLaneApiService,
    private config: ConfigService,
    private secretary: SecretaryService) { }

  public initializeApp() {
    return this.database.init({
      dataSources: {
        shipgirls: this.api.fetchAllShipgirls(),
      },
    });
  }
}
