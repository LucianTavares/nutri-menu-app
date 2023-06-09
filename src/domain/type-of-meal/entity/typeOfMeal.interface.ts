import DayOfTheWeek from "../../today-menu/entity/value-object/dayOfTheWeek";

export default interface TypeOfMealInterface {

  get id(): string
  get type(): string
  get DayOfTheWeek(): DayOfTheWeek
}