import { Sequelize } from "sequelize-typescript"
import TypeOfMealModel from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.model"
import TypeOfMealRepository from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.repository"
import TypeOfMeal from "../../../domain/type-of-meal/entity/typeOfMeal"
import DayOfTheWeek from "../../../domain/today-menu/entity/value-object/dayOfTheWeek"
import TodayMenuModel from "../../../infrastructure/today-menu/repository/sequelize/todayMenu.model"
import MixturesModel from "../../../infrastructure/mixture/repository/sequelize/mixtures.model"
import UserModel from "../../../infrastructure/user/repository/sequelize/user.model"
import CreateTypeOfMealUseCase from "./create.typeOfMeal"

describe("Integration test create Type Of Meal use case", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([TypeOfMealModel, TodayMenuModel, MixturesModel, UserModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a type of meal", async () => {

    const typeOfMealRepository = new TypeOfMealRepository()
    const usecase = new CreateTypeOfMealUseCase(typeOfMealRepository)

    const typeOfMeal = new TypeOfMeal("1", "Café")
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek

    await typeOfMealRepository.create(typeOfMeal)

    const input = {
      type: "Café",
      dayOfTheWeek: {
        day: "Segunda-Feira"
      }
    }

    const output = {
      id: expect.any(String),
      type: "Café",
      dayOfTheWeek: {
        day: "Segunda-Feira"
      }
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })
})