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

  constructor(private api: ApiService) {}

  ngAfterViewInit() {
    let params = null;
    if (this.state) {
      params = new HttpParams().set('state', this.state);
    }
    this.api.polls.index(params).subscribe(response => {
      this.polls = response.body;
    });
  }

  answerFor(average: any, answers: any[]): any {
    return find(answers, {candidate_name: average.candidate_name});
  }
}
