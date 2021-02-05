export interface schedulesDay {
    scheduleName: string,
    mealName: string
}

export class Day {
    private _date: Date;
    private _weekDayName: string;
    private _meals: schedulesDay[];

    constructor(date: string, weekDayName: string, meals: schedulesDay[], ) {
        this._weekDayName = weekDayName;
        this._meals = meals;
        this._date = new Date(date);
    }

    get date (): Date {
        return this._date;
    }

    get weekDayName (): string {
        return this._weekDayName;
    }

    get meals (): schedulesDay[] {
        return this._meals;
    }
}