import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-counter-item',
  templateUrl: './header-counter-item.component.html',
  styleUrls: ['./header-counter-item.component.scss']
})
export class HeaderCounterItemComponent implements OnInit {

  @Input() public iconClass: string;
  @Input() public text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
