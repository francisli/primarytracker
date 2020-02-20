import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { ApiService, NavigationService } from '../shared/services';

import moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  now: any;
  states: any[] = null;
  showMenu = false;

  constructor(private api: ApiService, private location: Location) {}

  ngAfterViewInit() {
    this.now = moment();
    this.api.states.index().subscribe(response => {
      this.states = response.body;
    });
  }

  onJump() {
    this.showMenu = false;
  }

  isPastPrimary(state: any) {
    return moment(state.primary_date).isBefore(this.now);
  }
}
