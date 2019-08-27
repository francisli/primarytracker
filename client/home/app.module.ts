import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PollsComponent } from './polls.component';

import { ApiService } from '../shared/services';


@NgModule({
  declarations: [
    AppComponent,
    PollsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}