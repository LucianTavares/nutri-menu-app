import TypeOfMealRepositoryInterface from "../../../domain/type-of-meal/repository/typeOfMeal-repository.interface";
import { InputFindByTypeTypeOfMealUseCaseDto, OutputFindByTypeTypeOfMealUseCaseDto } from "./findByType.typeOfMeal.usecase.dto";

export default class FindByTypeTypeOfMealUseCase {

  private typeOfMealRepository: TypeOfMealRepositoryInterface

  constructor(typeOfMealRepository: TypeOfMealRepositoryInterface) {
    this.typeOfMealRepository = typeOfMealRepository;
  }

  async findByType(input: InputFindByTypeTypeOfMealUseCaseDto): Promise<OutputFindByTypeTypeOfMealUseCaseDto> {

    const typeOfMeal = await this.typeOfMealRepository.findByType(input.type)

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