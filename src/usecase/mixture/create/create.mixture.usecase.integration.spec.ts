import { Sequelize } from "sequelize-typescript"
import TypeOfMealModel from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.model"
import TodayMenuModel from "../../../infrastructure/today-menu/repository/sequelize/todayMenu.model"
import MixturesModel from "../../../infrastructure/mixture/repository/sequelize/mixtures.model"
import UserModel from "../../../infrastructure/user/repository/sequelize/user.model"
import MixturesRepository from "../../../infrastructure/mixture/repository/sequelize/mixture.repository"
import Mixture from "../../../domain/mixture/entity/mixture"
import CreateMixtureUseCase from "./create.mixture.usecase"

describe("Integration test create Mixture use case", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([
      TypeOfMealModel,
      TodayMenuModel,
      MixturesModel,
      UserModel
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a mixture", async () => {

    const mixtureRepository = new MixturesRepository()
    const usecase = new CreateMixtureUseCase(mixtureRepository)

    const mixture = new Mixture({id: "1", mixture: "Pão"})
    mixture.cannotFreeze()
    mixture.activate()

    await mixtureRepository.create(mixture)

    const input = {
      id: "1",
      mixture: "Pão",
      can_freeze: false,
      active: true
    }

    const output = {
      id: expect.any(String),
      mixture: "Pão",
      can_freeze: false,
      active: true
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })
})