import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { SecretaryService } from 'src/app/core/services/secretary/secretary.service';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { map, first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.scss']
})
export class SecretaryComponent implements OnInit {

  public selector = '#secretary';
  public selectorChibi = '#secretary_chibi';

  public imageUrl$: Observable<string>;
  public animationClass$: BehaviorSubject<string>;

  private enableAnimations = false;

  constructor(
    private configService: ConfigService,
    private secretaryService: SecretaryService) {
      this.configService.config$.pipe(
        first()
      ).subscribe(config => this.enableAnimations = config.enableIdleAnimations);
      this.imageUrl$ = this.secretaryService.fullImageUrl$.pipe(
        map(url => `url(${url})`),
      );
      this.animationClass$ = new BehaviorSubject<string>('');
    }

  public ngOnInit(): void {
    this.configService.config$.pipe(
      map(config => config.enableIdleAnimations),
      first(),
    ).subscribe(enableIdleAnimation => this.enableAnimations = enableIdleAnimation);
  }

  public setAnim(animName: string) {
    this.animationClass$.next(animName);
  }

  public setIconAnim(animName: string) {
    document.querySelector(this.selectorChibi).classList.add(animName);
  }

  public tapped() {
    if (this.enableAnimations) {
      this.animationClass$.next('bobbing');
      timer(450).subscribe(() => this.animationClass$.next(''));
    }
  }
}
