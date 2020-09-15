import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, timer } from 'rxjs';
import { switchMap, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  public currentTime$: Observable<Date>;

  constructor() {
    const curDate = new Date();
    const secondsUntilNextMinute = curDate.getMilliseconds() - 1000;
    this.currentTime$ = timer(secondsUntilNextMinute).pipe(
      switchMap(() => interval(1000)),
      map(() => new Date()),
      shareReplay(),
    );
  }
}
