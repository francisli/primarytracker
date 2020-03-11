
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
  results: any[] = [];
  showPolls = true;
  showMenu = false;

  constructor(private api: ApiService, private location: Location) {}

  ngAfterViewInit() {
    this.now = moment();
    this.api.states.index().subscribe(response => {
      this.states = response.body;
      const candidates: any = {};
      for (let state of this.states) {
        for (let result of state.delegates) {
          if (!candidates[result.candidate]) {
            candidates[result.candidate] = 0;
          }
          candidates[result.candidate] += result.count;
        }
      }
      const results = [];
      for (let candidate in candidates) {
        if (candidate != 'Pending') {
          results.push({candidate, count: candidates[candidate]});
        }
      }
      results.sort((a, b) => b.count - a.count);
      if (candidates['Pending']) {
        results.splice(0, 0, {candidate: 'Pending', count: candidates['Pending']});
      }
      this.results = results;
    });
  }

  onJump() {
    this.showMenu = false;
  }

  isPastPrimary(state: any) {
    return moment(state.primary_date).isBefore(this.now);
  }
}
