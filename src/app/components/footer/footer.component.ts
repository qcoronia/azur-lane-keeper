import { Component, OnInit } from '@angular/core';
import { LinkInfo } from 'src/app/core/services/config/config.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public buttons: LinkInfo[];

  constructor() {
    this.buttons = [
      { label: 'Shop', icon: 'fa fa-store' },
      { label: 'Dock', icon: 'fa fa-anchor' },
      { label: 'Depot', icon: 'fa fa-warehouse' },
      { label: 'HQ', icon: 'fa fa-school' },
      { label: 'Lab', icon: 'fa fa-atom' },
      { label: 'Missions', icon: 'fa fa-clipboard-list' },
      { label: 'Build', icon: 'fa fa-cube' },
      { label: 'Guild', icon: 'fa fa-ship' },
    ];
  }

  ngOnInit(): void {
  }

}
