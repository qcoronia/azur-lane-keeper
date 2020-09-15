import { Injectable, OnDestroy } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { of, Subject, Observable, BehaviorSubject, zip, Subscription, merge, forkJoin } from 'rxjs';
import { map, tap, switchMap, filter, distinctUntilChanged } from 'rxjs/operators';
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

  private imageUrlCacher$$: Subscription;

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
      map(shipgirls => shipgirls[0]),
    );
    this.skin$ = forkJoin([
      this.secretary$,
      this.secretaryShipgirl$
    ]).pipe(
      map(([secretaryInfo, shipgirl]) => shipgirl.skins.find(e => e.name === secretaryInfo.name))
    );
    this.fullImageUrl$ = this.skin$.pipe(
      map(skinInfo => skinInfo.image),
    );
    this.chibiImageUrl$ = this.skin$.pipe(
      map(skinInfo => skinInfo.chibi),
    );

    this.imageUrlCacher$$ = merge(
      this.fullImageUrl$,
      this.chibiImageUrl$
    ).pipe(
      switchMap(imageUrl => this.cacheService.ensureCached(imageUrl)),
    ).subscribe(() => { });
  }

  public ngOnDestroy() {
    this.imageUrlCacher$$.unsubscribe();
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
