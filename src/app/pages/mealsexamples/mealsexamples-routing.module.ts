import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealsexamplesPage } from './mealsexamples.page';

const routes: Routes = [
  {
    path: '',
    component: MealsexamplesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsexamplesPageRoutingModule {}
