import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetListComponent } from './fleet-list.component';
import { ShipgirlThumbnailComponentModule } from '../shipgirl-thumbnail/shipgirl-thumbnail-component.module';



@NgModule({
  declarations: [FleetListComponent],
  imports: [
    CommonModule,

    ShipgirlThumbnailComponentModule,
  ],
  exports: [FleetListComponent]
})
export class FleetListComponentModule { }
