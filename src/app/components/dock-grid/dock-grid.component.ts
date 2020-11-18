import { Component, OnInit } from '@angular/core';
import { ShipgirlService } from 'src/app/core/services/shipgirl/shipgirl.service';
import { Observable, combineLatest } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { GridOptions } from 'ag-grid-community';
import { DockNotesService } from 'src/app/core/services/dock-notes/dock-notes.service';

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
    skipHeaderOnAutoSize: true,
    defaultColDef: {
      sortable: true,
      filter: true,
      cellStyle: {'white-space': 'normal'},
      autoHeight: true,
      flex: 1,
      filterParams: {
        clearButton: true,
      },
    },
    getRowNodeId: data => data.id,
    columnDefs: [
      { headerName: 'Rarity', field: 'rarity', maxWidth: 120 },
      { headerName: 'Type', field: 'hullType', maxWidth: 170 },
      { headerName: 'Name', field: 'names.en', cellStyle: { fontWeight: 'bold' }, maxWidth: 260 },
      { headerName: 'Notes', field: '_ext.notes', cellStyle: { fontStyle: 'italic' }, editable: true, onCellValueChanged: params => {
        this.dockNotes.setNote({ shipName: params.data.names.en, notes: params.newValue });
      } },
    ],
    onGridReady: evt => evt.api.sizeColumnsToFit(),
  };

  constructor(
    private shipgirl: ShipgirlService,
    private dockNotes: DockNotesService) {
    this.ships$ = combineLatest([
      this.shipgirl.getAll(),
      this.dockNotes.getAll()
    ]).pipe(
      map(([ships, notes]) => ships.map(ship => {
        const noteForShip = notes.find(e => e.shipName === ship.names.en);
        return {
          ...ship,
          _ext: {
            notes: noteForShip?.notes,
          },
        };
      })),
      shareReplay(1),
    );
  }

  ngOnInit(): void {
  }

}
