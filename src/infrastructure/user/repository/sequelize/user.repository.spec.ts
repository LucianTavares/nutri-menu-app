import { Sequelize } from "sequelize-typescript"
import TypeOfMealModel from "../../../type-of-meal/repository/sequelize/typeOfMeal.model"
import MixturesModel from "../../../mixture/repository/sequelize/mixtures.model"
import TodayMenuModel from "../../../today-menu/repository/sequelize/todayMenu.model"
import UserModel from "./user.model"
import User from "../../../../domain/user/entity/user"
import UserRepository from "./user.repository"

describe("User repository tests", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([
      TypeOfMealModel,
      MixturesModel,
      TodayMenuModel,
      UserModel
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a user", async () => {

    const userRepository = new UserRepository()
    const user = new User("1", "Lucian", "lucian@fc.com.br")
    user.activate()

    await userRepository.create(user)

    const userModel = await UserModel.findOne({ where: { id: user.id } })

    expect(userModel.toJSON()).toStrictEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.isActive()
    })
  })

  it("should update a user", async () => {

    const userRepository = new UserRepository()
    const user = new User("1", "Lucian", "lucian@fc.com.br")
    user.activate()

    await userRepository.create(user)

    user.changeName("Lucian Tavares")

    await userRepository.update(user)

    const userModel = await UserModel.findOne({ where: { id: user.id } })

    expect(userModel.toJSON()).toStrictEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.isActive()
    })
  })

  it("should delete a user", async () => {

    const userRepository = new UserRepository()
    const user = new User("1", "Lucian", "lucian@fc.com.br")
    user.activate()

    await userRepository.create(user)

    const userModel = await UserModel.findOne({ where: { id: user.id } })

    expect(userModel.toJSON()).toStrictEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.isActive()
    })

    const result = await userRepository.delete(user.id)

    expect(result).toBeUndefined()
  })

  it("should find a user", async () => {

    const userRepository = new UserRepository()
    const user = new User("1", "Lucian", "lucian@fc.com.br")
    user.activate()

    await userRepository.create(user)

    const userModel = await UserModel.findOne({
      where: { id: user.id,}
    })

    const foundUser = await userRepository.find(user.id)

    expect(userModel.toJSON()).toStrictEqual({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      active: true
    })
  })
})