import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/day.model';
import { Router } from '@angular/router';
import { API } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title = "Inicio";

  sd1 = {scheduleName : "Desayuno", mealName : "Leche con galletas" }
  sd2 = {scheduleName : "Almuerzo", mealName : "Leche con galletas" }
  sd3 = {scheduleName : "Comida", mealName : "Leche con galletas" }
  sd4 = {scheduleName : "Merienda", mealName : "Leche con galletas" }
  sd5 = {scheduleName : "Cena", mealName : "Leche con galletas" }
  day = new Day(new Date().toDateString(), "Lunes", [this.sd1, this.sd2, this.sd3, this.sd4, this.sd5]);
  daysHardcoded = [this.day];

  days: Day[] = this.daysHardcoded;

  constructor(private api: API, private router: Router, private storageService: StorageService) {
    
    if(false) {
      this.router.navigate(['tutorial']);
    }
    // this.databaseService.getDbState().subscribe(async ready => {
    //   if(ready) {
    //     databaseService.getPreference("tutorial").then( res => {
    //       console.log("getpreferences");
    //       console.log(res);

          
    //     });

        
    //     this.databaseService.getDays().subscribe( data => {
    //       this.days = data;
    //     });
    //   }
    // });
  }

  ngOnInit() {
  }

  async generateWeek() {
    // const loading = document.createElement('ion-loading');
    // loading.message = "Se está generando el calendario...";
    // loading.duration = 2000;

    // document.body.appendChild(loading);
    // await loading.present();
    // this.generateWeekService.generateWeek().then( async res => {
    //   const { role, data } = await loading.onDidDismiss();
    // });
    this.api.login().subscribe( async (res : {access_token: string, token_type: string, 'expires_at': string}) => {
      console.log(res);
      this.storageService.setItem('token', res.access_token);
    });
  }

  user() {
    this.api.getUser().subscribe( async (res: User) => {
      console.log("Respuesta: ");
      console.log(res);
    })
  }

  isPast(currentDate: Date) {
    let date = new Date();
    let isPast = (currentDate.getFullYear() < date.getFullYear() || (currentDate.getFullYear() <= date.getFullYear() && currentDate.getMonth() < date.getMonth()) || 
                  currentDate.getFullYear() <= date.getFullYear() && currentDate.getMonth() <= date.getMonth() && currentDate.getDate() < date.getDate());
    console.log(isPast);
    return isPast;
  }
}
