import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { SecretaryService } from 'src/app/core/services/secretary/secretary.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';

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

  constructor(
    private configService: ConfigService,
    private secretaryService: SecretaryService) {
      this.imageUrl$ = this.secretaryService.fullImageUrl$;
      this.animationClass$ = new BehaviorSubject<string>('');
    }

  public ngOnInit(): void {
    if (this.configService.config$.value.enableIdleAnimations) {
      this.setAnim('anim-secretary-idle');
      // this.setIconAnim('anim-floating-icon');
    }
  }

  public setAnim(animName: string) {
    this.animationClass$.next(animName);
  }

  public setIconAnim(animName: string) {
    document.querySelector(this.selectorChibi).classList.add(animName);
  }

  public tapped() {
    if (!this.configService.config$.value.enableIdleAnimations) {
      return;
    }

    this.animationClass$.next('anim-bob');
    of({}).pipe(
      take(1),
      delay(450),
    ).subscribe(() => this.animationClass$.next('anim-secretary-idle'));
  }
}
