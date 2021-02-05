import { Meal } from '../models/meal.model';

export interface List {
    id: number,
    name: string,
    meals?: number[]
}

export interface MealSelectedList {
    id: number,
    name: string,
    selected: boolean
}

export interface MealHourDetails {
    id: number;
    weekDaysId: number;
    weekDaysName: string;
    scheduleId: number;
    scheduleName: string;
}

export interface User {
    id: number,
    name: string,
    email: string,
    created_at: string,
    updated_at: string
}