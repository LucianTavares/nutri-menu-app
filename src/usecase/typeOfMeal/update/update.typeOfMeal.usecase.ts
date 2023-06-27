import DayOfTheWeek from "../../../domain/today-menu/entity/value-object/dayOfTheWeek";
import TypeOfMealRepositoryInterface from "../../../domain/type-of-meal/repository/typeOfMeal-repository.interface";
import { InputUpdateTypeOfMealUseCaseDto, OutputUpdateTypeOfMealUseCaseDto } from "./update.typeOfMeal.usecase.dto";

export default class UpdateTypeOfMealUseCase {

  private typeOfMealRepository: TypeOfMealRepositoryInterface

  constructor(typeOfMealRepository: TypeOfMealRepositoryInterface) {
    this.typeOfMealRepository = typeOfMealRepository
  }

  async execute(input: InputUpdateTypeOfMealUseCaseDto): Promise<OutputUpdateTypeOfMealUseCaseDto> {

    const typeOfMeal = await this.typeOfMealRepository.find(input.id)
    const dayOfTheWeek = new DayOfTheWeek(input.dayOfTheWeek.day)

    typeOfMeal.changeType(input.type)
    typeOfMeal.changeDay(dayOfTheWeek)
    typeOfMeal.DayOfTheWeek = dayOfTheWeek

    await this.typeOfMealRepository.update(typeOfMeal)

    return {
      id: input.id,
      type: input.type,
      dayOfTheWeek: {
        day: input.dayOfTheWeek.day
      }
    }
  }
}