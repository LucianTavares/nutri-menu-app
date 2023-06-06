import { Sequelize } from "sequelize-typescript"
import TodayMenuRepository from "./todayMenu.repository"
import MixturesModel from "../../../mixture/repository/sequelize/mixtures.model"
import TypeOfMealModel from "../../../type-of-meal/repository/sequelize/typeOfMeal.model"
import TodayMenuModel from "./todayMenu.model"
import User from "../../../../domain/user/entity/user"
import TypeOfMeal from "../../../../domain/type-of-meal/entity/typeOfMeal"
import DayOfTheWeek from "../../../../domain/today-menu/entity/value-object/dayOfTheWeek"
import Mixtures from "../../../../domain/mixture/entity/mixtures"
import UserModel from "../../../user/repository/sequelize/user.model"
import TodayMenu from "../../../../domain/today-menu/entity/todayMenu"
import UserRepository from "../../../user/repository/sequelize/user.repository"

describe("Today Menu repository tests", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([
      UserModel,
      TypeOfMealModel,
      MixturesModel,
      TodayMenuModel,
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a today menu", async () => {

    const userRepository = new UserRepository()
    const user = new User("1", "Lucian", "lucian@fc.com.br")
    await userRepository.create(user)

    const typeOfMeal = new TypeOfMeal("1", "Café")
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek
    typeOfMeal.activate()

    const mixture = new Mixtures("1", "Pão")
    mixture.cannotFreeze()
    mixture.activate()

    const todayMenuRepository = new TodayMenuRepository()
    const todayMenu = new TodayMenu({ id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal], userId: user.id })
    todayMenu.unfreeze()
    todayMenu.activate()

    await todayMenuRepository.create(todayMenu)

    const todayMenuModel = await TodayMenuModel.findOne({
      where: { id: todayMenu.id },
      include: ["mixtures", "type_of_meal"]
    })

    expect(todayMenuModel).toBeDefined()
    expect(todayMenuModel.id).toBe(todayMenu.id)
    expect(todayMenuModel.mixtures[0].id).toBe(todayMenu.mixtures[0].id)
    expect(todayMenuModel.mixtures[0].mixture).toBe(todayMenu.mixtures[0].mixture)
    expect(todayMenuModel.mixtures[0].can_freeze).toBe(todayMenu.mixtures[0].isFreeze())
    expect(todayMenuModel.mixtures[0].active).toBe(todayMenu.mixtures[0].isActive())
    expect(todayMenuModel.type_of_meal[0].id).toBe(todayMenu.typeOfMeal[0].id)
    expect(todayMenuModel.type_of_meal[0].type).toBe(todayMenu.typeOfMeal[0].type)
    expect(todayMenuModel.type_of_meal[0].day).toBe(todayMenu.typeOfMeal[0].DayOfTheWeek.day)
    expect(todayMenuModel.type_of_meal[0].active).toBe(todayMenu.typeOfMeal[0].isActive())
    expect(todayMenuModel.active).toBe(todayMenu.isActive())
  })

  it("should update a today menu", async () => {

    const userRepository = new UserRepository()
    const user = new User("1", "Lucian", "lucian@fc.com.br")
    await userRepository.create(user)

    const typeOfMeal = new TypeOfMeal("1", "Café")
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek
    typeOfMeal.activate()

    const mixture = new Mixtures("1", "Pão")
    mixture.cannotFreeze()
    mixture.activate()

    const todayMenuRepository = new TodayMenuRepository()
    const todayMenu = new TodayMenu({ id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal], userId: user.id })
    todayMenu.unfreeze()
    todayMenu.activate()

    await todayMenuRepository.create(todayMenu)

    const todayMenuModel = await TodayMenuModel.findOne({
      where: { id: todayMenu.id },
      include: ["mixtures", "type_of_meal"]
    })

    expect(todayMenuModel.toJSON()).toStrictEqual({
      id: "1",
      active: true,
      its_frozen: false,
      mixtures: [{
        id: "1",
        mixture: "Pão",
        can_freeze: false,
        active: true,
        today_menu_id: "1"
      }],
      type_of_meal: [{
        id: "1",
        type: "Café",
        day: "Segunda-Feira",
        active: true,
        today_menu_id: "1"
      }],
      user_id: "1"
    })

    mixture.changeMixture("Frango")
    mixture.canFreeze()
    mixture.activate()

    typeOfMeal.changeType("Almoço")
    typeOfMeal.activate()

    todayMenu.freeze()

    await todayMenuRepository.update(todayMenu)

    const todayMenuModel2 = await TodayMenuModel.findOne({
      where: { id: "1" },
      include: ["mixtures", "type_of_meal"]
    })

    expect(todayMenuModel2.toJSON()).toStrictEqual({
      id: "1",
      active: true,
      its_frozen: true,
      mixtures: [{
        id: "1",
        mixture: "Frango",
        can_freeze: true,
        active: true,
        today_menu_id: "1"
      }],
      type_of_meal: [{
        id: "1",
        type: "Almoço",
        day: "Segunda-Feira",
        active: true,
        today_menu_id: "1"
      }],
      user_id: "1"
    })
  })

  it("should delete a today menu", async () => {

    const userRepository = new UserRepository()
    const user = new User("1", "Lucian", "lucian@fc.com.br")
    await userRepository.create(user)

    const typeOfMeal = new TypeOfMeal("1", "Café")
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek
    typeOfMeal.activate()

    const mixture = new Mixtures("1", "Pão")
    mixture.cannotFreeze()
    mixture.activate()

    const todayMenuRepository = new TodayMenuRepository()
    const todayMenu = new TodayMenu({ id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal], userId: user.id })
    todayMenu.unfreeze()
    todayMenu.activate()

    await todayMenuRepository.create(todayMenu)

    const todayMenuModel = await TodayMenuModel.findOne({
      where: { id: todayMenu.id },
      include: ["mixtures", "type_of_meal"]
    })

    expect(todayMenuModel.toJSON()).toStrictEqual({
      id: "1",
      active: true,
      its_frozen: false,
      mixtures: [{
        id: "1",
        mixture: "Pão",
        can_freeze: false,
        active: true,
        today_menu_id: "1"
      }],
      type_of_meal: [{
        id: "1",
        type: "Café",
        day: "Segunda-Feira",
        active: true,
        today_menu_id: "1"
      }],
      user_id: "1"
    })

    const result = await todayMenuRepository.delete(todayMenu.id)

    expect(result).toBeUndefined()
  })

  it("should find a today menu", async () => {

    const userRepository = new UserRepository()
    const user = new User("1", "Lucian", "lucian@fc.com.br")
    await userRepository.create(user)

    const typeOfMeal = new TypeOfMeal("1", "Café")
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek
    typeOfMeal.activate()

    const mixture = new Mixtures("1", "Pão")
    mixture.cannotFreeze()
    mixture.activate()

    const todayMenuRepository = new TodayMenuRepository()
    const todayMenu = new TodayMenu({ id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal], userId: user.id })
    todayMenu.unfreeze()
    todayMenu.activate()

    await todayMenuRepository.create(todayMenu)

    const todayMenuModel = await TodayMenuModel.findOne({
      where: { id: todayMenu.id },
      include: ["mixtures", "type_of_meal"]
    })

    const foundTodayMenu = await todayMenuRepository.find(todayMenu.id)

    expect(todayMenuModel.toJSON()).toStrictEqual({
      id: foundTodayMenu.id,
      mixtures: [
        {
          id: mixture.id,
          mixture: mixture.mixture,
          can_freeze: mixture.isFreeze(),
          active: mixture.isActive(),
          today_menu_id: todayMenu.id,
        }
      ],
      type_of_meal: [{
        id: typeOfMeal.id,
        type: typeOfMeal.type,
        day: typeOfMeal.DayOfTheWeek.day,
        active: typeOfMeal.isActive(),
        today_menu_id: todayMenu.id
      }],
      user_id: foundTodayMenu.userId,
      active: foundTodayMenu.isActive(),
      its_frozen: foundTodayMenu.isFrozen(),
    })
  })

  it("should find all Menu", async () => {

    const userRepository = new UserRepository()
    const user = new User("1", "Lucian", "lucian@fc.com.br")
    await userRepository.create(user)

    const typeOfMealOne = new TypeOfMeal("1", "Café")
    const dayOfTheWeekOne = new DayOfTheWeek("Segunda-Feira")
    typeOfMealOne.DayOfTheWeek = dayOfTheWeekOne
    typeOfMealOne.activate()

    const typeOfMealTwo = new TypeOfMeal("2", "Almoço")
    const dayOfTheWeekTwo = new DayOfTheWeek("Segunda-Feira")
    typeOfMealTwo.DayOfTheWeek = dayOfTheWeekTwo
    typeOfMealTwo.activate()

    const mixtureOne = new Mixtures("1", "Pão")
    mixtureOne.cannotFreeze()
    mixtureOne.activate()

    const mixtureTwo = new Mixtures("2", "Pão")
    mixtureTwo.cannotFreeze()
    mixtureTwo.activate()

    const todayMenuRepository = new TodayMenuRepository()

    const todayMenuOne = new TodayMenu({ id: "1", mixtures: [mixtureOne], typeOfMeal: [typeOfMealOne], userId: user.id })
    todayMenuOne.unfreeze()
    todayMenuOne.activate()

    const todayMenuTwo = new TodayMenu({ id: "2", mixtures: [mixtureTwo], typeOfMeal: [typeOfMealTwo], userId: user.id })
    todayMenuTwo.unfreeze()
    todayMenuTwo.activate()

    await todayMenuRepository.create(todayMenuOne)
    await todayMenuRepository.create(todayMenuTwo)

    const foundTodayMenus = await TodayMenuModel.findAll({
      include: ["mixtures", "type_of_meal"]
    })

    expect(foundTodayMenus.map((menu) => menu.toJSON())).toStrictEqual([
      {
        id: todayMenuOne.id,
        active: todayMenuOne.isActive(),
        its_frozen: todayMenuOne.isFrozen(),
        mixtures: [
          {
            id: mixtureOne.id,
            mixture: mixtureOne.mixture,
            can_freeze: mixtureOne.isFreeze(),
            active: mixtureOne.isActive(),
            today_menu_id: todayMenuOne.id,
          }
        ],
        type_of_meal: [
          {
            id: typeOfMealOne.id,
            type: typeOfMealOne.type,
            day: typeOfMealOne.DayOfTheWeek.day,
            active: typeOfMealOne.isActive(),
            today_menu_id: todayMenuOne.id
          }
        ],
        user_id: todayMenuOne.userId
      },
      {
        id: todayMenuTwo.id,
        active: todayMenuTwo.isActive(),
        its_frozen: todayMenuTwo.isFrozen(),
        mixtures: [
          {
            id: mixtureTwo.id,
            mixture: mixtureTwo.mixture,
            can_freeze: mixtureTwo.isFreeze(),
            active: mixtureTwo.isActive(),
            today_menu_id: todayMenuTwo.id,
          }
        ],
        type_of_meal: [
          {
            id: typeOfMealTwo.id,
            type: typeOfMealTwo.type,
            day: typeOfMealTwo.DayOfTheWeek.day,
            active: typeOfMealTwo.isActive(),
            today_menu_id: todayMenuTwo.id
          }
        ],
        user_id: todayMenuTwo.userId
      }
    ])
  })
})