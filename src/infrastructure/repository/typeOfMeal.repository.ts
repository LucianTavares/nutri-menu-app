import TypeOfMeal from "../../domain/entity/typeOfMeal";
import TypeOfMealRepositoryInterface from "../../domain/repository/typeOfMeal-repository.inteface";
import TypeOfMealModel from "../database/sequelize/model/typeOfMeal.model";

export default class TypeOfMealRepository implements TypeOfMealRepositoryInterface {

  async create(entity: TypeOfMeal): Promise<void> {

    await TypeOfMealModel.create({
      id: entity.id,
      type: entity.type,
      day: entity.DayOfTheWeek.day
    })
  }

  async update(entity: TypeOfMeal): Promise<void> {

    await TypeOfMealModel.update(
      {
        type: entity.type,
        day: entity.DayOfTheWeek.day
      },
      {
        where: {
          id: entity.id
        }
      }
    )

  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.")
  }

  async find(id: string): Promise<TypeOfMeal> {
    throw new Error("Method not implemented.")
  }

  async findByType(type: string): Promise<TypeOfMeal> {
    throw new Error("Method not implemented.")
  }

  async findAll(): Promise<TypeOfMeal[]> {
    throw new Error("Method not implemented.")
  }

}