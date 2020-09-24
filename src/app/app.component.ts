import { Component, OnInit } from '@angular/core';
import { AppService } from './core/services/app/app.service';
import { tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'azur-lane-keeper';
  public isReady = false;

  constructor(private app: AppService) { }

  ngOnInit() {
    this.app.initializeApp().pipe(
      delay(250),
    ).subscribe(() => {
      this.isReady = true;
    });
  }
}
