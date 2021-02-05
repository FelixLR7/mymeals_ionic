import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealsexamplesPageRoutingModule } from './mealsexamples-routing.module';

import { MealsexamplesPage } from './mealsexamples.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealsexamplesPageRoutingModule
  ],
  declarations: [MealsexamplesPage]
})
export class MealsexamplesPageModule {}
