import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal.model';
import { Category } from 'src/app/models/category.model';
import { Schedule } from 'src/app/models/schedule.model';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {
  title = "Comidas";
  type = "meal";
  searchValue = "";
  searchColumn = "name";

  meals = new Observable();

  constructor(private toastController: ToastController, private router: Router) { }

  ngOnInit() {
    // this.databaseService.getDbState().subscribe(ready => {
    //   if(ready) {
    //     this.meals = this.databaseService.getMeals();
    //   }
    // });
  }
}
