import { Sequelize } from "sequelize-typescript"
import UserModel from "../../../infrastructure/user/repository/sequelize/user.model"
import TodayMenuModel from "../../../infrastructure/today-menu/repository/sequelize/todayMenu.model"
import MixturesModel from "../../../infrastructure/mixture/repository/sequelize/mixtures.model"
import TypeOfMealModel from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.model"
import TypeOfMealRepository from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.repository"
import TypeOfMeal from "../../../domain/type-of-meal/entity/typeOfMeal"
import DayOfTheWeek from "../../../domain/today-menu/entity/value-object/dayOfTheWeek"
import FindTypeOfMealUseCase from "./findByType.typeOfMeal.usecase"

describe("Integration test find by type Type Of Meal use case", () => {

  let sequelize: Sequelize

  beforeEach(async () => {

    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([
      UserModel, 
      TodayMenuModel, 
      MixturesModel, 
      TypeOfMealModel
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should find a type of meal by type", async () => {

    const typeOfMealRepository = new TypeOfMealRepository()
    const usecase = new FindTypeOfMealUseCase(typeOfMealRepository)

    const typeOfMeal = new TypeOfMeal({id: "1", type: "Janta"})
    const dayOfTheWeek = new DayOfTheWeek("Quarta-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek
    typeOfMeal.activate()

    await typeOfMealRepository.create(typeOfMeal)

    const input = {
      type: "Janta"
    }

    const output = {
      id: "1",
      type: "Janta",
      dayOfTheWeek: {
        day: "Quarta-Feira"
      },
      active: true
    }

    const result = await usecase.findByType(input)

    expect(result).toEqual(output)
  })
})