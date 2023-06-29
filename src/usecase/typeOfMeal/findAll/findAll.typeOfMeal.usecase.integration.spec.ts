import { Sequelize } from "sequelize-typescript"
import UserModel from "../../../infrastructure/user/repository/sequelize/user.model"
import TodayMenuModel from "../../../infrastructure/today-menu/repository/sequelize/todayMenu.model"
import MixturesModel from "../../../infrastructure/mixture/repository/sequelize/mixtures.model"
import TypeOfMealModel from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.model"
import TypeOfMealRepository from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.repository"
import TypeOfMeal from "../../../domain/type-of-meal/entity/typeOfMeal"
import DayOfTheWeek from "../../../domain/today-menu/entity/value-object/dayOfTheWeek"
import FindAllTypeOfMealUseCase from "./findAll.typeOfMeal.usecase"

describe("Integration test findAll Type Of Meal use case", () => {

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

  it("should find all types of meal", async () => {

    const typeOfMealRepository = new TypeOfMealRepository()
    const usecase = new FindAllTypeOfMealUseCase(typeOfMealRepository)

    const inputOne = {
      id: "1",
      type: "Café",
      dayOfTheWeek: {
        day: "Segunda-Feira"
      }
    } 

    const inputTwo = {
      id: "2",
      type: "Almoço",
      dayOfTheWeek: {
        day: "Terça-Feira"
      }
    } 

    const typeOfMealOne = new TypeOfMeal(inputOne.id, inputOne.type)
    const dayOfTheWeekOne = new DayOfTheWeek(inputOne.dayOfTheWeek.day)
    typeOfMealOne.DayOfTheWeek = dayOfTheWeekOne
    typeOfMealOne.activate()

    const typeOfMealTwo = new TypeOfMeal(inputTwo.id, inputTwo.type)
    const dayOfTheWeekTwo = new DayOfTheWeek(inputTwo.dayOfTheWeek.day)
    typeOfMealTwo.DayOfTheWeek = dayOfTheWeekTwo
    typeOfMealTwo.activate()

    await typeOfMealRepository.create(typeOfMealOne)
    await typeOfMealRepository.create(typeOfMealTwo)

    const output = await usecase.execute({})

    expect(output.typesOfMeal.length).toBe(2)

    expect(output.typesOfMeal[0].id).toBe(typeOfMealOne.id)
    expect(output.typesOfMeal[0].type).toBe(typeOfMealOne.type)
    expect(output.typesOfMeal[0].dayOfTheWeek.day).toBe(typeOfMealOne.DayOfTheWeek.day)

    expect(output.typesOfMeal[1].id).toBe(typeOfMealTwo.id)
    expect(output.typesOfMeal[1].type).toBe(typeOfMealTwo.type)
    expect(output.typesOfMeal[1].dayOfTheWeek.day).toBe(typeOfMealTwo.DayOfTheWeek.day)
  })
})