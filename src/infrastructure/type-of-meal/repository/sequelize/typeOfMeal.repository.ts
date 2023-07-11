
import DayOfTheWeek from "../../../../domain/today-menu/entity/value-object/dayOfTheWeek";
import TypeOfMeal from "../../../../domain/type-of-meal/entity/typeOfMeal";
import TypeOfMealRepositoryInterface from "../../../../domain/type-of-meal/repository/typeOfMeal-repository.interface";
import TypeOfMealModel from "./typeOfMeal.model";

export default class TypeOfMealRepository implements TypeOfMealRepositoryInterface {

  async create(entity: TypeOfMeal): Promise<void> {

    await TypeOfMealModel.create({
      id: entity.id,
      type: entity.type,
      day: entity.DayOfTheWeek.day,
      active: entity.isActive()
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

    await TypeOfMealModel.destroy(
      {
        where: { id: id }
      }
    )
  }

  async find(id: string): Promise<TypeOfMeal> {
    let typeOfMeal
    try {
      typeOfMeal = await TypeOfMealModel.findOne(
        {
          where: { id: id }
        }
      )
    } catch (err) {
      throw new Error("Type Of Meal not found")
    }

    const type = new TypeOfMeal({
      id: typeOfMeal.id,
      type: typeOfMeal.type,
      active: typeOfMeal.active
    })
    const dayOfTheWeek = new DayOfTheWeek(typeOfMeal.day)
    type.DayOfTheWeek = dayOfTheWeek

    return type
  }

  async findByType(type: string): Promise<TypeOfMeal> {

    let typeOfMealFind
    try {
      typeOfMealFind = await TypeOfMealModel.findOne(
        {
          where: { type: type }
        }
      )
    } catch (err) {
      throw new Error("Type Of Meal not found")
    }

    const typeOfMeal = new TypeOfMeal({
      id: typeOfMealFind.id,
      type: typeOfMealFind.type,
      active: typeOfMealFind.active
    })
    const dayOfTheWeek = new DayOfTheWeek(typeOfMeal.DayOfTheWeek.day)
    typeOfMeal.DayOfTheWeek = dayOfTheWeek

    return typeOfMeal
  }

  async findAll(): Promise<TypeOfMeal[]> {

    const typesOfMealModels = await TypeOfMealModel.findAll()

    const typesOfMeal = typesOfMealModels.map((typeOfMealModel) => {
      let types = new TypeOfMeal({
        id: typeOfMealModel.id,
        type: typeOfMealModel.type,
        active: typeOfMealModel.active
      })
      const dayOfTheWeek = new DayOfTheWeek(typeOfMealModel.day)
      types.changeDay(dayOfTheWeek)
      if (typeOfMealModel.active) {
        types.activate()
      }
      return types
    })

    return typesOfMeal
  }
}