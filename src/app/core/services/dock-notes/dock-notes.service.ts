import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { Observable, of, Subject } from 'rxjs';
import { STORE_DOCK_NOTE } from '../database/store-names';
import { DockNote } from '../../models/entities/dock-note.model';
import { switchMap, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DockNotesService {

  public dockNoteListUpdated$: Subject<any>;

  constructor(private database: DatabaseService) {
    this.dockNoteListUpdated$ = new Subject<any>();
  }

  public getAll(): Observable<DockNote[]> {
    return this.database.selectAll(STORE_DOCK_NOTE).pipe();
  }

  public getByShipname(shipName: string): Observable<DockNote> {
    return this.database.selectByIndex(STORE_DOCK_NOTE, 'shipName', shipName).pipe();
  }

  public setNote(dockNote: DockNote) {
    this.getByShipname(dockNote.shipName).pipe(
      switchMap(res => !!res
        ? this.database.update(STORE_DOCK_NOTE, { ...res, notes: dockNote.notes })
        : this.database.insert(STORE_DOCK_NOTE, { shipName: dockNote.shipName, notes: dockNote.notes })),
      map(res => dockNote),
      take(1),
    ).subscribe(() => this.dockNoteListUpdated$.next());
  }

}
