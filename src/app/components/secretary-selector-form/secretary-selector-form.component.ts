import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { take, map, takeUntil, switchMap, filter, tap } from 'rxjs/operators';
import { Subject, Observable, zip } from 'rxjs';
import { SecretaryInfo } from 'src/app/core/services/config/config.model';
import { ShipgirlService } from 'src/app/core/services/shipgirl/shipgirl.service';

@Component({
  selector: 'app-secretary-selector-form',
  templateUrl: './secretary-selector-form.component.html',
  styleUrls: ['./secretary-selector-form.component.scss']
})
export class SecretarySelectorFormComponent implements OnInit, OnDestroy {

  public secretaryFormInternal: FormArray;
  get secretaryForm() {
    return this.secretaryFormInternal;
  }

  public shipgirls$: Observable<string[]>;
  public

  private destroyed$: Subject<void>;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private shipgirlService: ShipgirlService) {
    this.destroyed$ = new Subject<void>();
    const newRow = () => this.fb.group({
      name: [null],
      skin: ['Default'],
    });
    this.secretaryFormInternal = this.fb.array(Array(5).fill(newRow()));
    this.configService.config$.pipe(
      take(1),
      map(config => config.secretaries),
    ).subscribe(secretaries => {
      for (let i = 0; i < secretaries.length; i++) {
        this.secretaryFormInternal.setControl(i, newRow());
        this.secretaryFormInternal.get([i]).patchValue(secretaries[i]);
      }
    });
    this.secretaryFormInternal.valueChanges.pipe(
      takeUntil(this.destroyed$),
      map(form => form as SecretaryInfo[]),
    ).subscribe(form => {
      this.configService.patch({
        secretaries: form,
      });
    });
    this.shipgirls$ = this.shipgirlService.getAllNames();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public getSkins(name: string): Observable<string[]> {
    return this.shipgirlService.getByName(name).pipe(
      map(shipgirl => shipgirl.skins)
    );
  }

}
