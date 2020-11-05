import { Component, Input, AfterContentInit } from '@angular/core';
import { ShipgirlService } from 'src/app/core/services/shipgirl/shipgirl.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-shipgirl-thumbnail',
  templateUrl: './shipgirl-thumbnail.component.html',
  styleUrls: ['./shipgirl-thumbnail.component.scss']
})
export class ShipgirlThumbnailComponent implements AfterContentInit {

  @Input() public shipName: string;

  public thumbnailUrl: string;

  constructor(private shipgirl: ShipgirlService) { }

  ngAfterContentInit(): void {
    this.shipgirl.getByName(this.shipName).pipe(
      map(res => res.thumbnail),
      take(1),
    ).subscribe(url => this.thumbnailUrl = url);
  }

}
