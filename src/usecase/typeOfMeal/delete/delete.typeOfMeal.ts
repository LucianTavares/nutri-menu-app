import TypeOfMealRepositoryInterface from "../../../domain/type-of-meal/repository/typeOfMeal-repository.interface";
import { InputDeleteTypeOfMealUseCaseDto } from "./delete.typeOfMeal.dto";

export default class DeleteTypeOfMealUseCase {

  private typeOfMealRepository: TypeOfMealRepositoryInterface

  constructor(typeOfMealRepository: TypeOfMealRepositoryInterface) {
    this.typeOfMealRepository = typeOfMealRepository
  }

  async execute(input: InputDeleteTypeOfMealUseCaseDto): Promise<void> {

    const typeOfMealFind = await this.typeOfMealRepository.find(input.id)

    if (!typeOfMealFind) {
      throw new Error("Type of Meal not found")
    }

    await this.typeOfMealRepository.delete(typeOfMealFind.id)
  }
}