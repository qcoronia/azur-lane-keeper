import { Component, OnDestroy, Input } from '@angular/core';
import { ShipgirlService } from 'src/app/core/services/shipgirl/shipgirl.service';
import { Observable, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { shareReplay, map, takeUntil, tap } from 'rxjs/operators';
import { GridOptions, ValueGetterParams, GridApi, ColDef } from 'ag-grid-community';
import { DockNotesService } from 'src/app/core/services/dock-notes/dock-notes.service';
import { DockGridControlsModel } from '../dock-grid-controls/dock-grid-controls.component';

@Component({
  selector: 'app-dock-grid',
  templateUrl: './dock-grid.component.html',
  styleUrls: ['./dock-grid.component.scss']
})
export class DockGridComponent implements OnDestroy {

  public paramsUpdated$: Subject<DockGridControlsModel>;

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
    columnTypes: {
      number: { cellRenderer: params => (+params.value).toLocaleString(), cellStyle: { textAlign: 'right' }, comparator: (a, b) => {
        return +a === +b ? 0
          : isNaN(+a) ? -1
          : isNaN(+b) ? 1
          : +a - +b;
      } },
    },
    getRowNodeId: data => data.id,
    columnDefs: [
      { headerName: '', maxWidth: 70, minWidth: 70, pinned: true, valueGetter: params => `${params.node.rowIndex + 1}` },
      { headerName: 'Name', field: 'names.en', cellStyle: { fontWeight: 'bold' }, maxWidth: 260, minWidth: 260, pinned: true, tooltipField: 'names.en' },
      { headerName: 'Type', field: 'hullType', maxWidth: 170, minWidth: 170 },
      { headerName: 'Faction', field: 'nationality', maxWidth: 170, minWidth: 170 },
      { headerName: 'Rarity', field: 'stars.stars', maxWidth: 170, minWidth: 170, valueGetter: params => params.data.stars.value, valueFormatter: params => params.data.stars.stars },
      { headerName: 'Class', field: 'class', maxWidth: 170, minWidth: 170 },
      { headerName: 'Notes', field: '_ext.notes', cellStyle: { fontStyle: 'italic' }, editable: true, onCellValueChanged: params => {
        this.dockNotes.setNote({ shipName: params.data.names.en, notes: params.newValue });
      } },

      ...[
        'baseStats',
        'level100',
        'level100Retrofit',
        'level120',
        'level120Retrofit',
      ].map(e => ([
        { headerName: 'ACC', field: `stats.${e}.accuracy`, type: 'number' },
        { headerName: 'AA', field: `stats.${e}.antiair`, type: 'number' },
        { headerName: 'ASW', field: `stats.${e}.antisubmarineWarfare`, type: 'number' },
        { headerName: 'DEF', field: `stats.${e}.armor` },
        { headerName: 'AVI', field: `stats.${e}.aviation`, type: 'number' },
        { headerName: 'EVA', field: `stats.${e}.evasion`, type: 'number' },
        { headerName: 'FP', field: `stats.${e}.firepower`, type: 'number' },
        { headerName: 'HP', field: `stats.${e}.health`, type: 'number' },
        { headerName: 'LCK', field: `stats.${e}.luck`, type: 'number' },
        { headerName: 'OIL', field: `stats.${e}.oilConsumption`, type: 'number' },
        { headerName: 'RLD', field: `stats.${e}.reload`, type: 'number' },
        { headerName: 'SPD', field: `stats.${e}.speed`, type: 'number' },
        { headerName: 'TRP', field: `stats.${e}.torpedo`, type: 'number' },
      ])).reduce((p, c) => [...p, ...c]),

    ],
    onGridReady: evt => this.paramsUpdated$.next(),
    onSortChanged: evt => evt.api.refreshCells(),
  };

  private whenDestroyed$: Subject<any>;

  constructor(
    private shipgirl: ShipgirlService,
    private dockNotes: DockNotesService) {
    this.whenDestroyed$ = new Subject<any>();

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

    this.paramsUpdated$ = new Subject<DockGridControlsModel>();
    this.paramsUpdated$.pipe(
      tap(console.warn),
      takeUntil(this.whenDestroyed$),
    ).subscribe(params => this.updateLayout(params));
  }

  ngOnDestroy(): void {
    this.whenDestroyed$.next();
    this.whenDestroyed$.complete();
  }

  public updateLayout(params?: DockGridControlsModel) {
    const requiredColumns = [
      'names.en',
    ];

    const notesColumns = [
      '_ext.notes',
    ];

    const statsColumns = [
      'accuracy',
      'antiair',
      'antisubmarineWarfare',
      'armor',
      'aviation',
      'evasion',
      'firepower',
      'health',
      'luck',
      'oilConsumption',
      'reload',
      'speed',
      'torpedo',
    ];

    const statLevelFocus = params?.statsLevelFocus || '';
    const statLevel = statLevelFocus === 'base' ? 'baseStats'
      : statLevelFocus === '100' ? 'level100'
      : statLevelFocus === '100Retrofit' ? 'level100Retrofit'
      : statLevelFocus === '120' ? 'level120'
      : statLevelFocus === '120Retrofit' ? 'level120Retrofit'
      : '';

    let visibleColumns = [];
    let hiddenColumns = [];

    switch (params?.columnLayout) {
      case 'notes':
        visibleColumns = [...requiredColumns, ...notesColumns];
        hiddenColumns = statsColumns;
        break;

      case 'info':
        visibleColumns = [...requiredColumns, 'nationality', 'hullType', 'stars.stars', 'class'];
        hiddenColumns = statsColumns;
        break;

      case 'stats':
        visibleColumns = ['names.en', ...statsColumns.map(e => `stats.${statLevel}.${e}`)];
        console.warn(statsColumns.map(e => `${statLevel}.${e}`));
        hiddenColumns = notesColumns;
        break;

      default:
        visibleColumns = [...requiredColumns, ...notesColumns];
        hiddenColumns = statsColumns;
        break;
    }

    this.gridOptions.columnApi.setColumnsVisible(this.gridOptions.columnDefs.map((e: ColDef) => e.field), false);
    this.gridOptions.columnApi.setColumnsVisible(visibleColumns, true);
    this.gridOptions.api.sizeColumnsToFit();
  }

}
