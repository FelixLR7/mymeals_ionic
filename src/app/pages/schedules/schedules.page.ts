import { Component, OnInit } from '@angular/core';
import { Schedule } from 'src/app/models/schedule.model';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.page.html',
  styleUrls: ['./schedules.page.scss'],
})
export class SchedulesPage implements OnInit {
  title = "Horarios";
  
  sch1 = new Schedule(1, "Desayuno");
  sch2 = new Schedule(2, "Almuerzo");
  sch3 = new Schedule(3, "Comida");
  sch4 = new Schedule(4, "Merienda");
  sch5 = new Schedule(5, "Cena");

  schedules: Schedule[] = [this.sch1, this.sch2, this.sch3, this.sch4, this.sch5];
  schedules2: Schedule[] = [];
  testList: {id1, id2}[] = [];

  constructor() { }


  ngOnInit() {
    // this.db.getDbState().subscribe(ready => {
    //   if(ready) {
    //     this.db.getTest().subscribe(scheds => {
    //       this.schedules2 = scheds;
    //     })
    //   }
    // });
    // this.db.getDbState().subscribe(ready => {
    //   if(ready) {
    //     this.db.getTest().subscribe(tests => {
    //       this.testList = tests;
    //     })
    //   }
    // });
  }
}
