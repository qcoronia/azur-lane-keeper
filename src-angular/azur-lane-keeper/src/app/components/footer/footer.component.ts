import { Component, OnInit } from '@angular/core';
import { faStore, faAnchor, faWarehouse, faSchool, faAtom, faClipboardList, faCube, faShip, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public buttons: ButtonInfo[];

  constructor() {
    this.buttons = [
      { icon: faStore, text: 'Shop' },
      { icon: faAnchor, text: 'Dock' },
      { icon: faWarehouse, text: 'Depot' },
      { icon: faSchool, text: 'HQ' },
      { icon: faAtom, text: 'Lab' },
      { icon: faClipboardList, text: 'Missions' },
      { icon: faCube, text: 'Build' },
      { icon: faShip, text: 'Guild' },
    ];
  }

  ngOnInit(): void {
  }

}

export class ButtonInfo {
  public icon: IconDefinition;
  public text: string;
}
