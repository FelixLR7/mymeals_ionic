import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    ListComponent
  ],
  exports: [
    HeaderComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    RouterModule
  ]
})
export class ComponentsModule { }
