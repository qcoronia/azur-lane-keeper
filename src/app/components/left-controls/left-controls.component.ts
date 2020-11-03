import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { Observable, Subject } from 'rxjs';
import { SecretaryService } from 'src/app/core/services/secretary/secretary.service';

@Component({
  selector: 'app-left-controls',
  templateUrl: './left-controls.component.html',
  styleUrls: ['./left-controls.component.scss']
})
export class LeftControlsComponent {

  constructor(private secretary: SecretaryService) {
  }

  public switchSecretary(): void {
    this.secretary.switchToNextSecretary();
  }

}
