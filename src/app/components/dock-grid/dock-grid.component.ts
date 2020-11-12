import { Component, OnInit } from '@angular/core';
import { ShipgirlService } from 'src/app/core/services/shipgirl/shipgirl.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-dock-grid',
  templateUrl: './dock-grid.component.html',
  styleUrls: ['./dock-grid.component.scss']
})
export class DockGridComponent implements OnInit {

  public ships$: Observable<any[]>;

  public gridOptions: GridOptions = {
    rowSelection: 'single',
    immutableData: true,
    defaultColDef: {
      sortable: true,
      filter: true,
      cellStyle: {'white-space': 'normal'},
      filterParams: {
        clearButton: true,
      }
    },
    getRowNodeId: data => data.id,
    columnDefs: [
      { headerName: '', field: 'stars.stars' },
      { headerName: 'Name', field: 'names.en' },
      { headerName: '', field: 'hullType' },
      { headerName: 'Faction', field: 'nationality' },
      { headerName: 'Rarity', field: 'rarity' },
      { headerName: 'Has Retrofit', field: 'retrofit', valueFormatter: params => params.value ? 'Yes' : 'No' },
      { headerName: 'Rarity', field: 'rarity' },
    ],
    onGridReady: evt => evt.api.sizeColumnsToFit(),
  };

  constructor(private shipgirl: ShipgirlService) {
    this.ships$ = this.shipgirl.getAll().pipe(
      shareReplay(1),
    );
  }

  ngOnInit(): void {
  }

}
