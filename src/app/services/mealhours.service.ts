import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule.model';
import { WeekDay } from '../models/weekDay.model';
import { MealHourDetails } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MealhoursService {
  public allMealHours: MealHourDetails[];
  public idsMap: number[][] = [];
  public schedules: Schedule[];
  public weekDays: WeekDay[];

  constructor() {    
    this.initialize();    
  }

  private async initialize() {
    // this.allMealHours = await this.databaserService.getMealHours();

    let weekDaysIds = [ ...new Set(this.getColumn("scheduleId"))];
    let weekDaysNames = [ ...new Set(this.getColumn("scheduleName"))];

    this.weekDays = weekDaysIds.map( (item, index) => {
      return new WeekDay(item, weekDaysNames[index]);
    });

    let schedulesIds = [ ...new Set(this.getColumn("scheduleId"))];
    let schedulesNames = [ ...new Set(this.getColumn("scheduleName"))];

    this.schedules = schedulesIds.map( (item, index) => {
      return new Schedule(item, schedulesNames[index]);
    });
  
    console.log("idsmap", this.idsMap)
    this.allMealHours.forEach( item => {
      if(this.idsMap[item.weekDaysId] === undefined) {
        console.log("undefined");
        this.idsMap[item.weekDaysId] = [];
      }

      this.idsMap[item.weekDaysId][item.scheduleId] = item.id;
    });
    console.log(this.idsMap);
  }

  private getColumn(column: string) {
    return this.allMealHours.map( item => { return item[column]});
  }

  async getId(weekDayId: number, scheduleId: number) {
    return this.idsMap[weekDayId][scheduleId];
  }

  public getSchedules() {
    return this.schedules;
  }

  public getWeekDays() {
    return this.weekDays;
  }
}
