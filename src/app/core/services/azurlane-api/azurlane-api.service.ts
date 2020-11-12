import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AzurLaneApiService {

  public shipsUrl = 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json';

  public chaptersUrl = 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/chapters.json';

  public equipmentsUrl = 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/equipments.json';

  constructor(private http: HttpClient) { }

  public fetchAllShipgirls() {
    return this.http.get(this.shipsUrl, { observe : 'body' }).pipe(
      map(res => Object.values(res)),
    );
  }

  public fetchAllChapters() {
    return this.http.get(this.chaptersUrl, { observe : 'body' }).pipe(
      map(res => Object.values(res)),
    );
  }

  public fetchAllEquipments() {
    return this.http.get(this.equipmentsUrl, { observe : 'body' }).pipe(
      map(res => Object.values(res)),
    );
  }
}
