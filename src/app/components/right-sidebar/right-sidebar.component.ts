import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LinkInfo } from 'src/app/core/services/config/config.model';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  public buttons$: Observable<LinkInfo[]>;
  public mandatoryButtons: LinkInfo[];

  constructor(private configService: ConfigService) {
    this.mandatoryButtons = [
      { label: 'Settings', icon: 'fa fa-cog' },
    ];
    this.buttons$ = this.configService.config$.pipe(
      map(config => config.sidebarButtons),
      map(buttons => [
        ...buttons,
        ...this.mandatoryButtons,
      ])
    );
  }

  ngOnInit(): void {
  }

}
