import DayOfTheWeek from "../../today-menu/entity/value-object/dayOfTheWeek";
import TypeOfMeal from "../entity/typeOfMeal";
import TypeOfMealInterface from "../entity/typeOfMeal.interface";
import { v4 as uuid } from 'uuid'

export default class TypeOfMealFactory {

  public static create(type: string): TypeOfMealInterface {

    const typeOfMeal = new TypeOfMeal({id: uuid(), type: type})
    typeOfMeal.isActive()

    return typeOfMeal
  }

  public static createWithDayOfTheWeek(type: string, day: DayOfTheWeek): TypeOfMealInterface {

    const typeOfMeal = new TypeOfMeal({ id: uuid(), type: type })
    typeOfMeal.changeDay(day)
    typeOfMeal.isActive()

    return typeOfMeal

  }
}