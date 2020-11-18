import { Directive, HostListener, EventEmitter, Output, ElementRef, AfterViewChecked } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi } from 'ag-grid-community';

@Directive({
  selector: '[appResponsiveGrid]'
})
export class ResponsiveGridDirective implements AfterViewChecked {

  private gridApi: GridApi;

  private resizeNeeded = true;

  constructor(private hostElement: ElementRef) {
    const component = this.hostElement.nativeElement.__component as AgGridAngular;
    this.gridApi = component.api as GridApi;
  }

  ngAfterViewChecked() {
    if (this.resizeNeeded) {
      window.setTimeout(() => {
        this.gridApi.sizeColumnsToFit();
        this.resizeNeeded = false;
      }, 50);
    }
  }

  @HostListener('resize')
  public resize() {
    this.resizeNeeded = true;
  }

}
