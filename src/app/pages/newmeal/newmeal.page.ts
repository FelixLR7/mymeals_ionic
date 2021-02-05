import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Schedule } from 'src/app/models/schedule.model';
import { Category } from 'src/app/models/category.model';
import { WeekDay } from 'src/app/models/weekDay.model';
import { Meal } from 'src/app/models/meal.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { IonContent, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-newmeal',
  templateUrl: './newmeal.page.html',
  styleUrls: ['./newmeal.page.scss'],
})
export class NewmealPage implements OnInit {
  id: number;
  title: string = "Nueva comida";

  categories: Category[] = [];
  schedules: Schedule[] = [];
  weekDays: WeekDay[] = [];

  @ViewChild(IonContent, { static: false }) ionContent: IonContent;
  
  form: FormGroup = null;
  schedulesGroup: FormArray;
  weekDaysGroup: FormArray;

  schedulesError: boolean = true;
  nameError: boolean = false;
  weekDaysError: boolean = false;
   
  constructor(private router: Router, private toastController: ToastController,
              private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params.id;
    
    if(this.id >= 0) {
      this.title = "Editar comida";
    }
    
    // this.databaseService.getDbState().subscribe(async ready => {
    //   if(ready) {
    //     await this.databaseService.getCategories().subscribe( data => {
    //       this.categories = data;
    //     });

    //     await this.databaseService.getSchedules().subscribe( data => {
    //       this.schedules = data;
    //     });
        
    //     await this.databaseService.getWeekDays().subscribe( data => {
    //       this.weekDays = data;
    //     });

    //     let mealHours = await databaseService.getMealHours();
        
    //     console.log(mealHours);
    //     // let schedules = this.getColumnFromArray(mealHours, "schedule_name");
        
        

    //     let schedulesGroup = this.createSchedulesGroup(this.schedules);
    //     let weekDaysGroup = this.createWeekDaysGroup(this.weekDays);
    
    //     this.form = new FormGroup({
    //       name: new FormControl("", Validators.required),
    //       schedules: schedulesGroup,
    //       weekdays: weekDaysGroup,
    //       category: new FormControl("")
    //     });        

    //     if(this.id >= 0) {
    //       this.databaseService.getMeal(this.id).then( meal => {
    //         if(meal) {
    //           this.loadMeal(meal);
    //         }
    //         else {
    //           this.presentToast("No se ha podido cargar la comida");
    //           this.back();
    //         }
    //       });
    //     }
    //     else {
    //       this.form.controls.category.setValue(0);
    //     }
    //   }
    // });
  }


  ngOnInit() {
  }

  loadMeal(meal: Meal) {
    this.form.controls.name.setValue(meal.name);
    this.form.controls.category.setValue(meal.category.id);
    // let weekDays = this.getColumnFromArray(meal.mealHours, "weekdays_id");
    // let schedules = this.getColumnFromArray(meal.mealHours, "schedule_id");
    // this.updateSchedulesGroup(meal.schedules);
    // this.updateWeekDaysGroup(meal.weekDays);
  
  }

  // getWeekDays(mealHours: MealHour[]) {
  //   mealHours.map( item => {
  //     return new WeekDay(item.weekDaysId, item.weekDaysName);
  //   });
  // }

  getColumnFromArray(array: any[], column: number | string) {
    let newArray = [ ...new Set(array.map( item => {
      return item[column];
    }))];

    console.log(newArray);
    return newArray;
  }

  private createSchedulesGroup(array) {
    return new FormArray(array.map( item => {
      return new FormGroup({
        id: new FormControl(item.id),
        name: new FormControl(item.name),
        selected: new FormControl(false)
      })
    }));
  }

  private updateSchedulesGroup(schedulesSelected) {
    for(let item of schedulesSelected) {
      let schedule = (<FormArray>this.form.get("schedules")).at(item.id);
      schedule.patchValue({
        selected: true
      });
    }

    this.schedulesError = false;
  }

  // private getSchedules(mealHours: MealHour[]) {

  // }

  private createWeekDaysGroup(array) {
    return new FormArray(array.map( item => {
      return new FormGroup({
        id: new FormControl(item.id),
        name: new FormControl(item.name),
        selected: new FormControl(true)
      })
    }));
  }

  private updateWeekDaysGroup(weekDaysSelected) {
    let weekDays = (<FormArray>this.form.get("weekdays")).controls;

    weekDays.forEach( value => {
      let weekDayId = value.get("id").value;
      if(weekDaysSelected.some( item => item.id == weekDayId)) {
        value.patchValue({
          selected: true
        });
      }
      else {
        value.patchValue({
          selected: false
        });
      }
    });
  }

  checkName() {
    this.nameError = !this.form.controls.name.value.length;
  }

  checkSchedule() {
    this.schedulesError = !this.isAtLeastOneChecked(this.form.controls.schedules.value);
  }

  checkWeekDays() {
    this.weekDaysError = !this.isAtLeastOneChecked(this.form.controls.weekdays.value);
  }

  saveMeal() {
    let controls = this.form.controls;

    if(controls.name.value.length == 0) {
      this.nameError = true;
      this.ionContent.scrollToTop(1000);
      return;
    }

    if(this.schedulesError || this.weekDaysError) {
      this.ionContent.scrollToTop(1000);
      return;
    }

    let name = this.form.controls.name.value;
    let category = this.categories[this.form.controls.category.value];
    let schedulesSelected = this.getSelectedItems(this.form.controls.schedules.value);
    let weekDaysSelected = this.getSelectedItems(this.form.controls.weekdays.value);
    
    let meal = new Meal(this.id, name, category, schedulesSelected, weekDaysSelected);
    
    if(this.id < 0) {
      // this.databaseService.insertMeal(meal).then( data => {
      //   let message = "La comida se ha guardado correctamente";

      //   if(!data) {
      //     message = "Ha habido un problema al guardar la comida";
      //   }

      //   this.presentToast(message);
      // });
    }
    else {
      // this.databaseService.updateMeal(meal).then( data => {
      //   let message = "La comida se ha actualizado correctamente";
        
      //   if(!data) {
      //     message = "Ha habido un problema al actualizar la comida";
      //   }

      //   this.presentToast(message);
      // });
    }

    this.back();
  }

  getMealHours() {

  }

  back() {
    this.router.navigate(['/meals']);
  }

  isAtLeastOneChecked(array) {
    return array.some( item => item.selected === true);
  }

  getSelectedItems(array) {
    return array.filter( item => {
      return item.selected;
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    
    toast.present();
  }

  d(text) {
    console.log(text);
  }
}
