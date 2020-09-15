import { Component, OnInit } from '@angular/core';
import { SecretaryService } from 'src/app/core/services/secretary/secretary.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {

  public avatarPicUrl$: Observable<string>;

  constructor(private secretaryService: SecretaryService) {
    this.avatarPicUrl$ = this.secretaryService.chibiImageUrl$.pipe(
      map(url => `url(${url})`),
    );
  }

  public ngOnInit(): void {
  }

  public openSecretaryForm() {
    console.warn('opened secretary form');
  }

}
