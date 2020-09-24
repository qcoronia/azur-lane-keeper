import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AzurLaneApiService {

  public dataSourceUrl = 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json';

  constructor(private http: HttpClient) { }

  public fetchAllShipgirls() {
    return this.http.get(this.dataSourceUrl, { observe : 'body' }).pipe(
      map(res => Object.values(res)),
    );
  }
}
