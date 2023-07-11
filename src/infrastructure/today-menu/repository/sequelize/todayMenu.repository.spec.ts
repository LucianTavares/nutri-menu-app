import { Sequelize } from "sequelize-typescript"
import TodayMenuRepository from "./todayMenu.repository"
import MixturesModel from "../../../mixture/repository/sequelize/mixtures.model"
import TypeOfMealModel from "../../../type-of-meal/repository/sequelize/typeOfMeal.model"
import TodayMenuModel from "./todayMenu.model"
import User from "../../../../domain/user/entity/user"
import TypeOfMeal from "../../../../domain/type-of-meal/entity/typeOfMeal"
import DayOfTheWeek from "../../../../domain/today-menu/entity/value-object/dayOfTheWeek"
import Mixtures from "../../../../domain/mixture/entity/mixture"
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

    const typeOfMeal = new TypeOfMeal({id: "1", type: "Café"})
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek
    typeOfMeal.activate()

    const mixture = new Mixtures({ id: "1", mixture: "Pão" })
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

    const typeOfMeal = new TypeOfMeal({id: "1", type: "Café"})
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek
    typeOfMeal.activate()

    const mixture = new Mixtures({ id: "1", mixture: "Pão" })
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

    const typeOfMeal = new TypeOfMeal({id: "1", type: "Café"})
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek
    typeOfMeal.activate()

    const mixture = new Mixtures({ id: "1", mixture: "Pão" })
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

    const typeOfMeal = new TypeOfMeal({id: "1", type: "Café"})
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek
    typeOfMeal.activate()

    const mixture = new Mixtures({ id: "1", mixture: "Pão" })
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

    const typeOfMealOne = new TypeOfMeal({id: "1", type: "Café"})
    const dayOfTheWeekOne = new DayOfTheWeek("Segunda-Feira")
    typeOfMealOne.DayOfTheWeek = dayOfTheWeekOne
    typeOfMealOne.activate()

    const typeOfMealTwo = new TypeOfMeal({id: "2", type: "Almoço"})
    const dayOfTheWeekTwo = new DayOfTheWeek("Segunda-Feira")
    typeOfMealTwo.DayOfTheWeek = dayOfTheWeekTwo
    typeOfMealTwo.activate()

    const mixtureOne = new Mixtures({ id: "1", mixture: "Pão" })
    mixtureOne.cannotFreeze()
    mixtureOne.activate()

    const mixtureTwo = new Mixtures({ id: "2", mixture: "Pão" })
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

    const menus = [todayMenuOne, todayMenuTwo]

    const foundTodayMenus = await todayMenuRepository.findAll()

    expect(menus).toEqual(foundTodayMenus)
    expect(foundTodayMenus.length).toBe(2)

    expect(foundTodayMenus[0].id).toBe(todayMenuOne.id)
    expect(foundTodayMenus[0].isFrozen()).toBe(todayMenuOne.isFrozen())
    expect(foundTodayMenus[0].isActive()).toBe(todayMenuOne.isActive())
    expect(foundTodayMenus[0].mixtures[0].id).toBe(todayMenuOne.mixtures[0].id)
    expect(foundTodayMenus[0].mixtures[0].mixture).toBe(todayMenuOne.mixtures[0].mixture)
    expect(foundTodayMenus[0].mixtures[0].isActive()).toBe(todayMenuOne.mixtures[0].isActive())
    expect(foundTodayMenus[0].mixtures[0].isFreeze()).toBe(todayMenuOne.mixtures[0].isFreeze())
    expect(foundTodayMenus[0].typeOfMeal[0].id).toBe(todayMenuOne.typeOfMeal[0].id)
    expect(foundTodayMenus[0].typeOfMeal[0].type).toBe(todayMenuOne.typeOfMeal[0].type)
    expect(foundTodayMenus[0].typeOfMeal[0].isActive()).toBe(todayMenuOne.typeOfMeal[0].isActive())
    expect(foundTodayMenus[0].typeOfMeal[0].DayOfTheWeek.day).toBe(todayMenuOne.typeOfMeal[0].DayOfTheWeek.day)
    expect(foundTodayMenus[0].userId).toBe(todayMenuOne.userId)

    expect(foundTodayMenus[1].id).toBe(todayMenuTwo.id)
    expect(foundTodayMenus[1].isFrozen()).toBe(todayMenuTwo.isFrozen())
    expect(foundTodayMenus[1].isActive()).toBe(todayMenuTwo.isActive())
    expect(foundTodayMenus[1].mixtures[0].id).toBe(todayMenuTwo.mixtures[0].id)
    expect(foundTodayMenus[1].mixtures[0].mixture).toBe(todayMenuTwo.mixtures[0].mixture)
    expect(foundTodayMenus[1].mixtures[0].isActive()).toBe(todayMenuTwo.mixtures[0].isActive())
    expect(foundTodayMenus[1].mixtures[0].isFreeze()).toBe(todayMenuTwo.mixtures[0].isFreeze())
    expect(foundTodayMenus[1].typeOfMeal[0].id).toBe(todayMenuTwo.typeOfMeal[0].id)
    expect(foundTodayMenus[1].typeOfMeal[0].type).toBe(todayMenuTwo.typeOfMeal[0].type)
    expect(foundTodayMenus[1].typeOfMeal[0].isActive()).toBe(todayMenuTwo.typeOfMeal[0].isActive())
    expect(foundTodayMenus[1].typeOfMeal[0].DayOfTheWeek.day).toBe(todayMenuTwo.typeOfMeal[0].DayOfTheWeek.day)
    expect(foundTodayMenus[1].userId).toBe(todayMenuTwo.userId)
  })
})