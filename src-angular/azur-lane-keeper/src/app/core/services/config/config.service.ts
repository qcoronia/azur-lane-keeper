import { Injectable, OnDestroy } from '@angular/core';
import { Config } from './config.model';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements OnDestroy {

  public keyname = 'al_keeper_usrcfg';

  public config$: BehaviorSubject<Config>;

  private destroyed$$: Subject<void> = new Subject<void>();

  constructor() {
    const existingConfig = window.localStorage.getItem(this.keyname);

    this.config$ = new BehaviorSubject<Config>({
      ...DEFAULT_CONFIG,
      ...JSON.parse(existingConfig || '{}'),
    });

    this.config$.pipe(
      takeUntil(this.destroyed$$),
    ).subscribe(config => {
      window.localStorage.setItem(this.keyname, JSON.stringify(config));
    });
  }

  public ngOnDestroy() {
    this.destroyed$$.next();
  }

  public patch(config: Partial<Config>) {
    this.config$.next({
      ...DEFAULT_CONFIG,
      ...config,
    });
  }
}

export const DEFAULT_CONFIG: Config = {
  localMinOffset: 480,
  gameMinOffset: -420,
  enableIdleAnimations: true,
  enableBlur: true,
  sidebarButtons: [
    { label: 'AL Facebook', icon: 'fab fa-facebook-square', url: '' },
    { label: 'AL Twitter', icon: 'fab fa-twitter', url: '' },
    { label: 'AL Reddit', icon: 'fab fa-reddit', url: '' },
    { label: 'Email', icon: 'fa fa-envelope', url: '', highlighted: true },
  ],
  secretaries: [
    { name: 'Long Island', skin: 'Default' },
    { name: 'Javelin', skin: 'Default' },
    { name: 'Ayanami', skin: 'Default' },
    { name: 'Laffey', skin: 'Default' },
    { name: 'Z23', skin: 'Default' },
  ],
  activeSecretaryIdx: 0,
  username: 'Shikikan',
};
