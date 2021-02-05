import { Category } from './category.model';
import { Schedule } from './schedule.model';
import { WeekDay } from './weekDay.model';
import { MealHours } from './mealHours.model';

export class Meal {
    private _id: number;
    private _name: string;
    private _category: Category;

    // not private because array setter starts a loop
    public mealHours: MealHours;
    public schedules: Schedule[];
    public weekDays: WeekDay[];

    constructor(id: number, name: string, category?: Category, schedules?: Schedule[], weekdays?: WeekDay[], mealHours?: MealHours) {
        this._id = id;
        this._name = name;
        this._category = category;
        this.schedules = schedules;
        this.weekDays = weekdays;
        this.mealHours = mealHours;
    }

    get id (): number {
        return this._id;
    }

    get name (): string {
        return this._name;
    }

    get category (): Category {
        return this._category;
    }

    set name(v : string) {
        this.name = v;
    }
    
    set category(v : Category) {
        this.category = v;
    }
}