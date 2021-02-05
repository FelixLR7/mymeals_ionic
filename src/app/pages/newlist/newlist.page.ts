import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, Form, ValidatorFn } from '@angular/forms';
import { Meal } from 'src/app/models/meal.model';
import { Observable } from 'rxjs';
import { MealSelectedList } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-newlist',
  templateUrl: './newlist.page.html',
  styleUrls: ['./newlist.page.scss'],
})
export class NewlistPage implements OnInit {
  title = "Nueva lista";
  id: number;

  form: FormGroup = null;
  meals: MealSelectedList[] = [];
  nameError = false;

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private router: Router) { 
    this.id = this.activatedRoute.snapshot.params.id;
    
    if(this.id >= 0) {
      this.title = "Editar lista";
    }

    // this.databaseService.getDbState().subscribe(async ready => {
    //   if(ready) {
    //     this.databaseService.getMealsList(this.id).then( data => {
    //       console.log(data);
    //       this.meals = data;
    //       this.addMeals();
    //     });
    //   }
    // });

    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, ]),
      meals: new FormArray([])
    });
  }

  ngOnInit() {
  }

  addMeals() {
    this.meals.forEach( item => {
      // console.log(item);
      const control = new FormGroup({
        id: new FormControl(item.id),
        name: new FormControl(item.name),
        selected: new FormControl(item.selected)
      });
      
      (this.form.controls.meals as FormArray).push(control);
    });
  }

  checkName() {
    this.nameError = !this.form.controls.name.value.length;
  }

  submit() {
    let name = this.form.get("name").value;
    let selectedMeals = this.getSelectedMeals();

    let list = { id : this.id, name : name, meals : selectedMeals }

    if(this.id < 0) {
      // this.databaseService.insertList(list).then( data => {
      //   let message = "La comida se ha actualizado correctamente";
          
      //   if(!data) {
      //     message = "Ha habido un problema al actualizar la comida";
      //   }
  
      //   this.presentToast(message);
  
      //   this.back();
      // });
    }
    else {
      // this.databaseService.updateList(list).then( data => {
      //   let message = "La comida se ha actualizado correctamente";
          
      //   if(!data) {
      //     message = "Ha habido un problema al actualizar la comida";
      //   }
  
      //   this.presentToast(message);
  
      //   this.back();
      // });
    }
  }

  getSelectedMeals() : number[] {
    let arrayMeals = (<FormArray>this.form.get("meals")).controls;
    let selectedMeals = arrayMeals.filter( item => item.get("selected").value == true ).map( item => { return item.get("id").value });

    return selectedMeals;
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    
    toast.present();
  }

  back() {
    this.router.navigate(['/lists']);
  }
}
