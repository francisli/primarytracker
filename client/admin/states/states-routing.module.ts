import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditStateComponent, ListStatesComponent } from '.';

const appRoutes: Routes = [
  {
    path: 'states',
    component: ListStatesComponent,
    children: [
      {
        path: ':id',
        component: EditStateComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StatesRoutingModule {}
