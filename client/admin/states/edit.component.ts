import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService, NavigationService } from '../../shared/services';

@Component({
  templateUrl: './edit.component.html'
})
export class EditStateComponent {
  id: string = null;
  @ViewChild('candidatesElement') candidatesElement: ElementRef;
  candidates: any[] = [];
  delegate: any = {
    candidate: '',
    count: 0
  };

  constructor(private api: ApiService, private navigation: NavigationService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.api.states.candidates(this.id).subscribe(response => {
      this.candidates = response.body;
    });
  }

  onDelete() {
    this.navigation.backTo(`/states`);
  }

  onAddDelegate(record: any) {
    record.delegates.push(this.delegate);
    this.delegate = {
      candidate: '',
      count: 0
    };
    this.candidatesElement.nativeElement.focus();
  }

  onRemoveDelegate(record: any, delegate: any) {
    record.delegates.splice(record.delegates.indexOf(delegate), 1);
  }
}
