import { Sequelize } from "sequelize-typescript"
import UserModel from "../../../infrastructure/user/repository/sequelize/user.model"
import TodayMenuModel from "../../../infrastructure/today-menu/repository/sequelize/todayMenu.model"
import MixturesModel from "../../../infrastructure/mixture/repository/sequelize/mixtures.model"
import TypeOfMealModel from "../../../infrastructure/type-of-meal/repository/sequelize/typeOfMeal.model"
import MixturesRepository from "../../../infrastructure/mixture/repository/sequelize/mixture.repository"
import Mixture from "../../../domain/mixture/entity/mixture"
import FindMixtureUseCase from "./find.mixture.usecase"

describe("Integration test find Mixture use case", () => {

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

  it("should find a mixture by id", async () => {

    const mixtureRepository = new MixturesRepository()
    const usecase = new FindMixtureUseCase(mixtureRepository)
    
    const props = {
      id: "1",
      mixture: "Frango",
      can_freeze: true,
      active: true
    }

    const mixture = new Mixture({
      id: props.id, 
      mixture: props.mixture,
      canFreeze: props.can_freeze,
      active: props.active
    })

    await mixtureRepository.create(mixture)

    const input = {
      id: "1"
    }

    const output = {
      id: "1",
      mixture: "Frango",
      can_freeze: true,
      active: true
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })
})