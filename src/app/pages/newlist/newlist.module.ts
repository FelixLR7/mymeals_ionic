import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewlistPageRoutingModule } from './newlist-routing.module';

import { NewlistPage } from './newlist.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewlistPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [NewlistPage]
})
export class NewlistPageModule {}
