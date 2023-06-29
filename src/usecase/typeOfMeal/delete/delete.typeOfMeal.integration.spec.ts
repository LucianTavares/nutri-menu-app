import { Sequelize } from "sequelize-typescript"
import TypeOfMealModel from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.model"
import TodayMenuModel from "../../../infrastructure/today-menu/repository/sequelize/todayMenu.model"
import MixturesModel from "../../../infrastructure/mixture/repository/sequelize/mixtures.model"
import UserModel from "../../../infrastructure/user/repository/sequelize/user.model"
import TypeOfMealRepository from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.repository"
import TypeOfMeal from "../../../domain/type-of-meal/entity/typeOfMeal"
import DayOfTheWeek from "../../../domain/today-menu/entity/value-object/dayOfTheWeek"
import DeleteTypeOfMealUseCase from "./delete.typeOfMeal"

describe("Integration test delete Type Of Meal use case", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([
      TypeOfMealModel,
      TodayMenuModel,
      MixturesModel, UserModel
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should delete a type of meal", async () => {

    const typeOfMealRepository = new TypeOfMealRepository()
    const usecase = new DeleteTypeOfMealUseCase(typeOfMealRepository)

    jest.spyOn(typeOfMealRepository, "find")

    const typeOfMeal = new TypeOfMeal("1", "Café")
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek
    typeOfMeal.activate()

    await typeOfMealRepository.create(typeOfMeal)

    const input = {
      id: typeOfMeal.id
    }

    const deleteType = jest.spyOn(typeOfMealRepository, "delete")

    await usecase.execute(input)

    expect(typeOfMealRepository.find).toHaveBeenCalledWith("1")
    expect(deleteType).toHaveBeenCalledWith("1")
  })
})