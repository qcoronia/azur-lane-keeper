import { Component, OnInit } from '@angular/core';
import { SecretaryService } from 'src/app/core/services/secretary/secretary.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {

  public avatarPicUrl$: Observable<string>;
  public username$: Observable<string>;

  constructor(
    private configService: ConfigService,
    private secretaryService: SecretaryService) {
    this.avatarPicUrl$ = this.secretaryService.chibiImageUrl$.pipe(
      map(url => `url(${url})`),
    );
    this.username$ = this.configService.config$.pipe(
      map(config => config.username),
    );
  }

  public ngOnInit(): void {
  }

  public openSecretaryForm() {
    console.warn('opened secretary form');
  }

}
