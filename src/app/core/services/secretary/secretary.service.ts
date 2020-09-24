import { Injectable, OnDestroy } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Subject, Observable, merge, combineLatest } from 'rxjs';
import { map, switchMap, filter, takeUntil, shareReplay } from 'rxjs/operators';
import { ShipgirlService } from '../shipgirl/shipgirl.service';
import { SecretaryInfo } from '../config/config.model';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class SecretaryService implements OnDestroy {
  public secretary$: Observable<SecretaryInfo>;
  public secretaryShipgirl$: Observable<any>;
  public skin$: Observable<SkinInfo>;
  public fullImageUrl$: Observable<string>;
  public chibiImageUrl$: Observable<string>;

  private destroyed$$: Subject<void> = new Subject<void>();

  constructor(
    private configService: ConfigService,
    private shipgirlService: ShipgirlService,
    private cacheService: CacheService) {
    this.secretary$ = this.configService.config$.pipe(
      map(config => config.secretaries[config.activeSecretaryIdx]),
    );
    this.secretaryShipgirl$ = this.secretary$.pipe(
      switchMap(secretaryInfo => this.shipgirlService.getByName(secretaryInfo.name)),
      filter(result => !!result),
    );

    this.skin$ = combineLatest([
      this.secretary$,
      this.secretaryShipgirl$
    ]).pipe(
      filter(([secretaryInfo, shipgirl]) => !!secretaryInfo && !!shipgirl),
      map(([secretaryInfo, shipgirl]) => shipgirl.skins.find(e => e.name === secretaryInfo.skin)),
    );

    this.fullImageUrl$ = this.skin$.pipe(
      map(skinInfo => skinInfo.image),
      shareReplay(1),
    );
    this.chibiImageUrl$ = this.skin$.pipe(
      map(skinInfo => skinInfo.chibi),
      shareReplay(1),
    );

    merge(
      this.fullImageUrl$,
      this.chibiImageUrl$
    ).pipe(
      switchMap(imageUrl => this.cacheService.ensureCached(imageUrl)),
      takeUntil(this.destroyed$$),
    ).subscribe(() => { });
  }

  public ngOnDestroy() {
    this.destroyed$$.next();
  }

  public switchToNextSecretary() {
    const newIndex = (this.configService.config$.value.activeSecretaryIdx + 1) % 5;
    this.configService.patch({
      activeSecretaryIdx: newIndex,
    });
  }
}

export class SkinInfo {
  public image: string;
  public chibi: string;
}
