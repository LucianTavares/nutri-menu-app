import { Sequelize } from "sequelize-typescript"
import UserModel from "../../../infrastructure/user/repository/sequelize/user.model"
import UserRepository from "../../../infrastructure/user/repository/sequelize/user.repository"
import User from "../../../domain/user/entity/user"
import TodayMenuModel from "../../../infrastructure/today-menu/repository/sequelize/todayMenu.model"
import MixturesModel from "../../../infrastructure/mixture/repository/sequelize/mixtures.model"
import TypeOfMealModel from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.model"
import FindUserUseCase from "./find.usecase"

describe("Integration test find User use case", () => {

  let sequelize: Sequelize

  beforeEach(async () => {

    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([UserModel, TodayMenuModel, MixturesModel, TypeOfMealModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should find a user", async () => {

    const userRepository = new UserRepository()
    const usecase = new FindUserUseCase(userRepository)

    const user = new User("1", "Lucian", "lucian@fc.com.br")
    user.activate()

    await userRepository.create(user)

    const input = {
      id: "1"
    }

    const output = {
      id: "1",
      name: "Lucian",
      email: "lucian@fc.com.br"
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })
})