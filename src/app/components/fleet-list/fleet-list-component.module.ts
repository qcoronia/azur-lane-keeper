import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetListComponent } from './fleet-list.component';
import { ShipgirlThumbnailComponentModule } from '../shipgirl-thumbnail/shipgirl-thumbnail-component.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FleetListComponent],
  imports: [
    CommonModule,
    RouterModule,

    ShipgirlThumbnailComponentModule,
  ],
  exports: [FleetListComponent]
})
export class FleetListComponentModule { }
