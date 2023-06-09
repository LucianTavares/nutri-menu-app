import DayOfTheWeek from "../../today-menu/entity/value-object/dayOfTheWeek";
import TypeOfMeal from "../entity/typeOfMeal";
import TypeOfMealInterface from "../entity/typeOfMeal.interface";
import {v4 as uuid} from 'uuid'

export default class TypeOfMealFactory {

  public static create(type: string): TypeOfMealInterface {

    return new TypeOfMeal(uuid(), type)
  }

  public static createWithDayOfTheWeek(type: string, day: DayOfTheWeek): TypeOfMealInterface {

    const typeOfMeal = new TypeOfMeal(uuid(), type)
    typeOfMeal.changeDay(day)

    return typeOfMeal

  }
}