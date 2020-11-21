import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dock-grid-controls',
  templateUrl: './dock-grid-controls.component.html',
  styleUrls: ['./dock-grid-controls.component.scss']
})
export class DockGridControlsComponent implements OnDestroy {

  public form: FormGroup;

  @Output() public whenParamsUpdated: EventEmitter<DockGridControlsModel>;

  public columnLayouts = [
    'notes',
    'stats',
  ];

  public statsLevelFocus = [
    'base',
    '100',
    '100Retrofit',
    '120',
    '120Retrofit',
  ];

  private whenDestroyed$: Subject<any>;

  constructor(private formBuilder: FormBuilder) {
    this.whenDestroyed$ = new Subject<any>();
    this.whenParamsUpdated = new EventEmitter<DockGridControlsModel>();

    this.form = this.formBuilder.group({
      columnLayout: ['notes'],
      statsLevelFocus: ['base'],
      showBarsOnStats: [false],
    });
    this.form.valueChanges.pipe(
      map(res => this.form.getRawValue() as DockGridControlsModel),
      takeUntil(this.whenDestroyed$),
    ).subscribe(params => this.whenParamsUpdated.next(params));
  }

  ngOnDestroy(): void {
    this.whenDestroyed$.next();
    this.whenDestroyed$.complete();
  }

}

export class DockGridControlsModel {
  public columnLayout: DockGridColumnLayouts;
  public statsLevelFocus: StatsLevelFocuses;
  public showBarsOnStats: boolean;
}

export type DockGridColumnLayouts = 'notes' | 'stats';
export type StatsLevelFocuses = 'base' | '100' | '100Retrofit' | '120' | '120Retrofit';
