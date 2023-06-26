import { Sequelize } from "sequelize-typescript"
import UserModel from "../../../infrastructure/user/repository/sequelize/user.model"
import TodayMenuModel from "../../../infrastructure/today-menu/repository/sequelize/todayMenu.model"
import MixturesModel from "../../../infrastructure/mixture/repository/sequelize/mixtures.model"
import TypeOfMealModel from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.model"
import UserRepository from "../../../infrastructure/user/repository/sequelize/user.repository"
import UpdateUserUseCase from "./update.user.usecase"
import User from "../../../domain/user/entity/user"

describe("Integration test update User use case", () => {

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

  it("should update a user", async () => {

    const input = {
      id: "1",
      name: "Lucian Tavares",
      email: "lucian@fc2.com.br"
    }

    const userRepository = new UserRepository()
    const usecase = new UpdateUserUseCase(userRepository)

    const user = new User(input.id, input.name, input.email)

    await userRepository.create(user)

    const result = await usecase.execute(input)

    expect(result).toEqual(input)
  })
})