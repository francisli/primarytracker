import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { ApiService, NavigationService } from '../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  states: any[] = null;
  showMenu = false;

  constructor(private api: ApiService, private location: Location) {}

  ngAfterViewInit() {
    this.api.states.index().subscribe(response => {
      this.states = response.body;
    });
  }

  onJump() {
    this.showMenu = false;
  }
}
