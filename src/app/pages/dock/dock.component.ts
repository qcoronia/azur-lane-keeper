import { Component, OnDestroy, ViewChild } from '@angular/core';
import { DockGridControlsModel } from 'src/app/components/dock-grid-controls/dock-grid-controls.component';
import { Subject } from 'rxjs';
import { DockGridComponent } from 'src/app/components/dock-grid/dock-grid.component';

@Component({
  selector: 'app-dock',
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.scss']
})
export class DockComponent implements OnDestroy {

  @ViewChild(DockGridComponent) public dockGrid: DockGridComponent;

  public paramsUpdated$: Subject<DockGridControlsModel>;

  constructor() {
    this.paramsUpdated$ = new Subject<DockGridControlsModel>();
  }

  ngOnDestroy(): void {
    this.paramsUpdated$.complete();
  }

  public paramsUpdated(params: DockGridControlsModel) {
    this.dockGrid.updateLayout(params);
  }

}
