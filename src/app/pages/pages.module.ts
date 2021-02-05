import { HomePage } from './home/home.page';
import { SchedulesPage } from './schedules/schedules.page';
import { CategoriesPage } from './categories/categories.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    HomePage,
    CategoriesPage,
    SchedulesPage,
    ComponentsModule
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
