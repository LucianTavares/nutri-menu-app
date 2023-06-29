import TypeOfMealInterface from "../../../domain/type-of-meal/entity/typeOfMeal.interface";
import TypeOfMealRepositoryInterface from "../../../domain/type-of-meal/repository/typeOfMeal-repository.interface";
import { InputFindAllTypeOfMealUseCaseDto, OutputFindAllTypeOfMealUseCaseDto } from "./findAll.typeOfMeal.usecase.dto";

export default class FindAllTypeOfMealUseCase {

  private typeOfMealRepository: TypeOfMealRepositoryInterface

  constructor(typeOfMealRepository: TypeOfMealRepositoryInterface) {
    this.typeOfMealRepository = typeOfMealRepository
  }

  async execute(input: InputFindAllTypeOfMealUseCaseDto): Promise<OutputFindAllTypeOfMealUseCaseDto> {

    const typesOfMeal =  await this.typeOfMealRepository.findAll()

    return OutputMapper.toOutput(typesOfMeal)
  }
}

class OutputMapper {
  
  static toOutput(types: TypeOfMealInterface[]): OutputFindAllTypeOfMealUseCaseDto {

    return {
      typesOfMeal: types.map((type) => ({
        id: type.id,
        type: type.type,
        dayOfTheWeek: {
          day: type.DayOfTheWeek.day
        }
      }))
    }
  }
}