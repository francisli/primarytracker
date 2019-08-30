import { Component } from '@angular/core';

import { ApiService } from '../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  states: any[] = null;

  constructor(private api: ApiService) {}

  ngAfterViewInit() {
    this.api.states.index().subscribe(response => {
      this.states = response.body;
    });
  }
}
