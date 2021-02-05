import { Schedule } from './schedule.model';
import { MealHourDetails } from '../interfaces/interfaces';
import { WeekDay } from './weekDay.model';

export class MealHours {
  public allMealHours: MealHourDetails[];
  public idsMap: number[][] = [];
  public schedules: Schedule[];
  public weekDays: WeekDay[];

  constructor(allMealHours: MealHourDetails[]) {
    this.allMealHours = allMealHours;
    // this.idsMap = this.getColumn("id");
    
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
    allMealHours.forEach( item => {
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

  public getId(weekDayId: number, scheduleId: number) {
    return this.idsMap[weekDayId][scheduleId];
  }

  public getSchedules() {
    return this.schedules;
  }

  public getWeekDays() {
    return this.weekDays;
  }
}