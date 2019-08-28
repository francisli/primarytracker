import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedComponentsModule } from '../../shared/components';
import { SharedPipesModule } from '../../shared/pipes';

import { StatesRoutingModule } from './states-routing.module';
import { EditStateComponent, ListStatesComponent } from '.';

@NgModule({
  declarations: [
    EditStateComponent,
    ListStatesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    SharedPipesModule,
    StatesRoutingModule
  ],
  providers: []
})
export class StatesModule {}
