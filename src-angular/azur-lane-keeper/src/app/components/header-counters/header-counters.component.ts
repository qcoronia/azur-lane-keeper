import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeService } from 'src/app/core/services/time/time.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header-counters',
  templateUrl: './header-counters.component.html',
  styleUrls: ['./header-counters.component.scss']
})
export class HeaderCountersComponent implements OnInit {

  public daysUntilPatch$: Observable<string>;
  public timeUntilReset$: Observable<string>;
  public currentTime$: Observable<string>;

  constructor(private timeService: TimeService) {
    this.daysUntilPatch$ = this.timeService.currentTime$.pipe(
      map(time => time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })),
    );
    this.timeUntilReset$ = this.timeService.currentTime$.pipe(
      map(time => time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })),
    );
    this.currentTime$ = this.timeService.currentTime$.pipe(
      map(time => time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })),
    );
  }

  ngOnInit(): void {
  }

}
