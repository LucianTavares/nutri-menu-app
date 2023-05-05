import { Sequelize } from "sequelize-typescript"
import MixturesRepository from "./mixture.repository"
import Mixtures from "../../domain/entity/mixtures"
import TypeOfMealRepository from "./typeOfMeal.repository"
import TypeOfMeal from "../../domain/entity/typeOfMeal"
import DayOfTheWeek from "../../domain/entity/value-object/dayOfTheWeek"
import TodayMenu from "../../domain/entity/todayMenu"
import TodayMenuRepository from "./todayMenu.repository"
import MixturesModel from "../database/sequelize/model/mixtures.model"
import TypeOfMealModel from "../database/sequelize/model/typeOfMeal.model"
import TodayMenuModel from "../database/sequelize/model/todayMenu.model"

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

    console.log(todayMenuModel.mixtures)

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