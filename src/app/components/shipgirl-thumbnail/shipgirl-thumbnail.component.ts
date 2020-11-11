import { Component, Input, AfterContentInit } from '@angular/core';
import { ShipgirlService } from 'src/app/core/services/shipgirl/shipgirl.service';
import { map, take, tap } from 'rxjs/operators';

const TRANSPARENT_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

@Component({
  selector: 'app-shipgirl-thumbnail',
  templateUrl: './shipgirl-thumbnail.component.html',
  styleUrls: ['./shipgirl-thumbnail.component.scss']
})
export class ShipgirlThumbnailComponent implements AfterContentInit {

  @Input() public shipName: string;

  public thumbnailUrl: string;

  constructor(private shipgirl: ShipgirlService) {
    this.thumbnailUrl = TRANSPARENT_PIXEL;
  }

  ngAfterContentInit(): void {
    this.shipgirl.getByName(this.shipName || '').pipe(
      map(res => res?.thumbnail || TRANSPARENT_PIXEL),
      take(1),
    ).subscribe(url => this.thumbnailUrl = url);
  }

}
