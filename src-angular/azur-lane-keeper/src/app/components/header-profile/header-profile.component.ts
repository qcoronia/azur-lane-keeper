import { Component, OnInit } from '@angular/core';
import { SecretaryService } from 'src/app/core/services/secretary/secretary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {

  public profilePicUrl$: Observable<string>;

  constructor(private secretaryService: SecretaryService) {
    this.profilePicUrl$ = secretaryService.chibiImageUrl$;
  }

  public ngOnInit(): void {
  }

  public openSecretaryForm() {
    console.warn('opened secretary form');
  }

}
