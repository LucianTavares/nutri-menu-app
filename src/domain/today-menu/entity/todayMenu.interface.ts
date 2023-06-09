import Mixtures from "../../mixture/entity/mixture";
import TypeOfMeal from "../../type-of-meal/entity/typeOfMeal";

export default interface TodayMenuInterface {

  get id(): string
  get mixtures(): Mixtures[]
  get typeOfMeal(): TypeOfMeal[]
  get userId(): string
}