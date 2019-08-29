import { Component, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiService } from '../shared/services';

import inflection from 'inflection';
import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';
import find from 'lodash/find';


@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent {
  @Input() state: string = null;
  polls: any[] = null;
  rankings: any[] = null;
  numVisible = 3;

  constructor(private api: ApiService) {}

  ngAfterViewInit() {
    let params = null;
    if (this.state) {
      params = new HttpParams().set('state', this.state);
    }
    this.api.polls.index(params).subscribe(response => {
      this.polls = response.body;
      if (this.polls.length > 0) {
        let rankings = cloneDeep(this.polls[0].averages);
        //// collect poll percentages for each ranked candidate
        for (let poll of this.polls) {
          for (let ranking of rankings) {
            let answer = find(poll.answers, {candidate_name: ranking.candidate_name}) as any;
            ranking.polls = ranking.polls || [];
            ranking.polls.push(answer.pct);
          }
        }
        this.rankings = rankings;
      }
    });
  }

  sparklinePath(candidate: string) {
    let path = this.state;
    if (path) {
      path = `/images/sparklines/${inflection.dasherize(path.toLowerCase())}`;
    } else {
      path = '/images/sparklines/national';
    }
    path = `${path}/${inflection.dasherize(candidate.replace(/[.']/g, '').toLowerCase())}.svg`;
    return path;
  }

  showMore() {
    if (this.numVisible < 10) {
      this.numVisible = 10;
    } else {
      this.numVisible = Math.min(this.rankings.length, this.numVisible + 10);
    }
  }
}
