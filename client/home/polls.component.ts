import { Component, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiService } from '../shared/services';

import inflection from 'inflection';
import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';
import find from 'lodash/find';
import moment from 'moment';

const sortAnswers = function(a: any, b: any) {
  if (a.pct < b.pct) {
    return 1;
  }
  if (a.pct > b.pct) {
    return -1;
  }
  if (a.answer < b.answer) {
    return -1;
  }
  if (a.answer > b.answer) {
    return 1;
  }
  return 0;
};

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent {
  @Input() state: any = null;
  @Input() showPolls = true;
  polls: any[] = null;
  paginationLink: string = null;
  rankings: any[] = null;
  numVisible = 3;
  column: number = null;

  constructor(private api: ApiService) { }

  ngAfterViewInit() {
    let params = null;
    if (this.state) {
      params = new HttpParams().set('state', this.state.state);
    }
    this.api.polls.index(params).subscribe(response => this.handleResponse(response));
  }

  handleResponse(response: any) {
    let length = this.polls ? this.polls.length : 0;
    if (this.polls) {
      this.polls = this.polls.concat(response.body);
    } else {
      this.polls = response.body;
      if (this.polls.length > 0) {
        this.rankings = cloneDeep(this.polls[0].averages);
      } else {
        this.rankings = [];
      }
    }
    //// collect poll percentages for each ranked candidate
    for (let poll of response.body) {
      for (let answer of poll.answers) {
        let ranking = find(this.rankings, {candidate_name: answer.candidate_name}) as any;
        if (!ranking) {
          ranking = find(poll.averages, {candidate_name: answer.candidate_name});
          ranking.polls = [];
          for (let i = 0; i < length; i++) {
            ranking.polls.push(null);
          }
          this.rankings.push(ranking);
        }
        ranking.polls = ranking.polls || [];
        ranking.polls.push(answer);
      }
      for (let ranking of this.rankings) {
        let answer = find(poll.answers, {candidate_name: ranking.candidate_name}) as any;
        if (!answer) {
          ranking.polls.push(null);
        }
      }
      length += 1;
    }
    this.rankings.sort(sortAnswers);
    this.paginationLink = this.api.parsePaginationLink(response.headers.get('Link')).next;
  }

  loadMorePolls() {
    if (this.paginationLink) {
      this.api.get(this.paginationLink).subscribe(response => this.handleResponse(response));
      this.paginationLink = null;
    }
  }

  sparklinePath(candidate: string) {
    let path;
    if (this.state) {
      path = `/images/sparklines/${inflection.dasherize(this.state.state.toLowerCase())}`;
    } else {
      path = '/images/sparklines/national';
    }
    path = `${path}/${inflection.dasherize(candidate.replace(/[.']/g, '').toLowerCase())}.svg`;
    return path;
  }

  showMoreCandidates() {
    if (this.numVisible < 10) {
      this.numVisible = 10;
    } else {
      this.numVisible = Math.min(this.rankings.length, this.numVisible + 10);
    }
  }
}
