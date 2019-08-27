import { Component, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiService } from '../shared/services';
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
  averages: any[] = null;

  constructor(private api: ApiService) {}

  ngAfterViewInit() {
    let params = null;
    if (this.state) {
      params = new HttpParams().set('state', this.state);
    }
    this.api.polls.index(params).subscribe(response => {
      this.polls = response.body;
      this.averages = this.calculateAverages(this.polls);
    });
  }

  calculateAverages(polls: any[]): any[] {
    let averages = [];
    //// calculate average over up to the last 5 polls
    const length = Math.min(5, polls.length);
    if (length > 0) {
      //// start with most recent poll
      averages = cloneDeep(polls[0].answers);
      for (let i = 1; i < length; i++) {
        //// sum poll percentages, remove answer if not found in a poll
        averages = filter(averages, (average) => {
          let answer = this.answerFor(average, polls[i].answers);
          if (answer) {
            average.pct += answer.pct;
          }
          return answer;
        });
      }
      for (let average of averages) {
        average.pct /= length;
      }
      this.sort(averages);
    }
    return averages;
  }

  answerFor(average: any, answers: any[]): any {
    return find(answers, {candidate_name: average.candidate_name});
  }

  sort(answers: any[]) {
    answers.sort(function(a, b) {
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
    });
  }
}
