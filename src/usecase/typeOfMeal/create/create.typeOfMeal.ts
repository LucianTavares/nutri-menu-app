import DayOfTheWeek from "../../../domain/today-menu/entity/value-object/dayOfTheWeek";
import TypeOfMeal from "../../../domain/type-of-meal/entity/typeOfMeal";
import TypeOfMealRepositoryInterface from "../../../domain/type-of-meal/repository/typeOfMeal-repository.interface";
import { InputCreateTypeOfMealUseCaseDto, OutputCreateTypeOfMealUseCaseDto } from "./create.typeOfMeal.dto";
import { v4 as uuid } from 'uuid'

export default class CreateTypeOfMealUseCase {

  private typeOfMealRepository: TypeOfMealRepositoryInterface

  constructor(typeOfMealRepository: TypeOfMealRepositoryInterface) {
    this.typeOfMealRepository = typeOfMealRepository;
  }

  async execute(input: InputCreateTypeOfMealUseCaseDto): Promise<OutputCreateTypeOfMealUseCaseDto> {

    const typeOfMealId = uuid()

    const props = {
      id: typeOfMealId,
      type: input.type,
      dayOfTheWeek: {
        day: input.dayOfTheWeek.day
      }
    }

    const typeOfMeal = new TypeOfMeal(props.id, props.type)
    const dayOfTheWeek = new DayOfTheWeek(props.dayOfTheWeek.day)

    typeOfMeal.DayOfTheWeek = dayOfTheWeek

    await this.typeOfMealRepository.create(typeOfMeal)

    return {
      id: typeOfMeal.id,
      type: typeOfMeal.type,
      dayOfTheWeek: {
        day: typeOfMeal.DayOfTheWeek.day
      }
    }
  }
}