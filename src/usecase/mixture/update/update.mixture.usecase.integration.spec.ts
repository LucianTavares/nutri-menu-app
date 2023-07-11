import { Sequelize } from "sequelize-typescript"
import UserModel from "../../../infrastructure/user/repository/sequelize/user.model"
import TodayMenuModel from "../../../infrastructure/today-menu/repository/sequelize/todayMenu.model"
import MixturesModel from "../../../infrastructure/mixture/repository/sequelize/mixtures.model"
import TypeOfMealModel from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.model"
import MixturesRepository from "../../../infrastructure/mixture/repository/sequelize/mixture.repository"
import Mixture from "../../../domain/mixture/entity/mixture"
import UpdateMixtureUseCase from "./update.mixture.usecase"

describe("Integration test update Mixture use case", () => {

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

  it("should update a mixture", async () => {

    const input =  {
      id: "1",
      mixture: "Frango",
      canFreeze: true,
      active: false
    }

    const mixtureRepository = new MixturesRepository()
    const usecase = new UpdateMixtureUseCase(mixtureRepository)

    const mixture = new Mixture({
      id: "1", 
      mixture: "Carne", 
      canFreeze: true,
      active: true
    })

    await mixtureRepository.create(mixture)

    const result = await usecase.execute(input)

    expect(result).toEqual(input)
  })
})