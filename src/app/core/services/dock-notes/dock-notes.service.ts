import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { Observable, of, Subject } from 'rxjs';
import { STORE_DOCK_NOTE } from '../database/store-names';
import { DockNote } from '../../models/entities/dock-note.model';
import { switchMap, map, take } from 'rxjs/operators';

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

  public setNote(dockNote: DockNote) {
    const note: DockNote = {
      shipName: dockNote.shipName,
      notes: dockNote.notes,
    };
    of({ hasId: !!note.id }).pipe(
      switchMap(res => res.hasId
        ? this.database.update(STORE_DOCK_NOTE, dockNote)
        : this.database.insert(STORE_DOCK_NOTE, dockNote)),
      map(res => dockNote),
      take(1),
    ).subscribe(() => this.dockNoteListUpdated$.next());
  }

}
