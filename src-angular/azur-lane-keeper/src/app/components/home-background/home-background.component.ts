import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { TimeService } from 'src/app/core/services/time/time.service';
import { map, distinctUntilChanged } from 'rxjs/operators';

export type DayTime = 'day' | 'night' | 'twilight';

@Component({
  selector: 'app-home-background',
  templateUrl: './home-background.component.html',
  styleUrls: ['./home-background.component.scss']
})
export class HomeBackgroundComponent implements OnInit {

  public backgroundClass$: Observable<DayTime>;

  constructor(private timeService: TimeService) { }

  public ngOnInit(): void {
    this.backgroundClass$ = this.timeService.currentTime$.pipe(
      map(date => date.getHours()),
      distinctUntilChanged(),
      map(curHour => curHour > 18 ? 'night'
        : curHour > 16 ? 'twilight'
        : curHour > 7 ? 'day'
        : curHour > 5 ? 'twilight'
        : curHour > 0 ? 'night'
        : 'day')
    );
  }

}
