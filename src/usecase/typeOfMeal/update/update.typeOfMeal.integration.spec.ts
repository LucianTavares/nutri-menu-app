import { Sequelize } from "sequelize-typescript"
import UserModel from "../../../infrastructure/user/repository/sequelize/user.model"
import TodayMenuModel from "../../../infrastructure/today-menu/repository/sequelize/todayMenu.model"
import MixturesModel from "../../../infrastructure/mixture/repository/sequelize/mixtures.model"
import TypeOfMealModel from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.model"
import TypeOfMealRepository from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.repository"
import TypeOfMeal from "../../../domain/type-of-meal/entity/typeOfMeal"
import DayOfTheWeek from "../../../domain/today-menu/entity/value-object/dayOfTheWeek"
import UpdateTypeOfMealUseCase from "./update.typeOfMeal.usecase"

describe("Integration test update Type Of Meal use case", () => {

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

  it("should update a type of meal", async () => {

    const input = {
      id: "1",
      type: "Almoço",
      dayOfTheWeek: {
        day: "Segunda-Feira"
      }
    }

    const typeOfMealRepository = new TypeOfMealRepository()
    const usecase = new UpdateTypeOfMealUseCase(typeOfMealRepository)
    
    const typeOfMeal = new TypeOfMeal(input.id, input.type)
    const dayOfTheWeek = new DayOfTheWeek(input.dayOfTheWeek.day)
    typeOfMeal.DayOfTheWeek = dayOfTheWeek
    typeOfMeal.activate()

    await typeOfMealRepository.create(typeOfMeal)

    const result = await usecase.execute(input)

    expect(result).toEqual(input)
  })
})