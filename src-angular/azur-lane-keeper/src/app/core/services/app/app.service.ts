import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { AzurLaneApiService } from '../azurlane-api/azurlane-api.service';
import { ConfigService } from '../config/config.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private database: DatabaseService,
    private api: AzurLaneApiService,
    private config: ConfigService) { }

  public initializeApp() {
    return this.database.init({
      dataSources: {
        shipgirls: this.api.fetchAllShipgirls(),
      },
    }).pipe(
      tap(res => this.config.load()),
      tap(res => { /* setup ui */ }),
    );
  }
}
