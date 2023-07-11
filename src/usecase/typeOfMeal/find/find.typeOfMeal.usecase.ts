import TypeOfMealRepositoryInterface from "../../../domain/type-of-meal/repository/typeOfMeal-repository.interface";
import { InputFindTypeOfMealUseCaseDto, OutputFindTypeOfMealUseCaseDto } from "./find.typeOfMeal.usecase.dto";

export default class FindTypeOfMealUseCase {

  private typeOfMealRepository: TypeOfMealRepositoryInterface

  constructor(typeOfMealRepository: TypeOfMealRepositoryInterface) {
    this.typeOfMealRepository = typeOfMealRepository;
  }

  async execute(input: InputFindTypeOfMealUseCaseDto): Promise<OutputFindTypeOfMealUseCaseDto> {

    const typeOfMeal = await this.typeOfMealRepository.find(input.id)

    return {
      id: typeOfMeal.id,
      type: typeOfMeal.type,
      dayOfTheWeek: {
        day: typeOfMeal.DayOfTheWeek.day
      },
      active: typeOfMeal.isActive()
    }
  }
}