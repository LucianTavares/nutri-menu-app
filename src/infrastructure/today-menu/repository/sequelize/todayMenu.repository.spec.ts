import { Sequelize } from "sequelize-typescript"
import TodayMenuRepository from "./todayMenu.repository"
import MixturesModel from "../../../mixture/repository/sequelize/mixtures.model"
import TypeOfMealModel from "../../../type-of-meal/repository/sequelize/typeOfMeal.model"
import TodayMenuModel from "./todayMenu.model"
import TypeOfMeal from "../../../../domain/type-of-meal/entity/typeOfMeal"
import DayOfTheWeek from "../../../../domain/today-menu/entity/value-object/dayOfTheWeek"
import Mixtures from "../../../../domain/mixture/entity/mixtures"
import TodayMenu from "../../../../domain/today-menu/entity/todayMenu"

describe("Today Menu repository tests", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([TypeOfMealModel, MixturesModel, TodayMenuModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a today menu", async () => {
    const typeOfMeal = new TypeOfMeal("1", "Café")
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek
    typeOfMeal.activate()

    const mixture = new Mixtures("1", "Pão")
    mixture.cannotFreeze()
    mixture.activate()

    const todayMenuRepository = new TodayMenuRepository()
    const todayMenu = new TodayMenu("1", [mixture], typeOfMeal.id)
    todayMenu.unfreeze()
    todayMenu.activate()

    await todayMenuRepository.create(todayMenu)
    
    const todayMenuModel = await TodayMenuModel.findOne({
      where: { id: todayMenu.id },
      include: ["mixtures"]
    })

    expect(todayMenuModel).toBeDefined()
    expect(todayMenuModel.id).toBe(todayMenu.id)
    expect(todayMenuModel.mixtures[0].id).toBe(todayMenu.mixtures[0].id)
    expect(todayMenuModel.mixtures[0].mixture).toBe(todayMenu.mixtures[0].mixture)
    expect(todayMenuModel.mixtures[0].can_freeze).toBe(todayMenu.mixtures[0].isFreeze())
    expect(todayMenuModel.mixtures[0].active).toBe(todayMenu.mixtures[0].isActive())
    expect(todayMenuModel.type_of_meal_id).toBe(todayMenu.typeOfMealId)
    expect(todayMenuModel.active).toBe(todayMenu.isActive())
  })
})