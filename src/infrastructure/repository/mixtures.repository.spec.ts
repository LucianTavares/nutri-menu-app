import { Sequelize } from "sequelize-typescript"
import MixturesModel from "../database/sequelize/model/mixtures.model"
import Mixtures from "../../domain/entity/mixtures"
import MixturesRepository from "./mixture.repository"

describe("Mixtures repository tests", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([MixturesModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a mixture", async () => {
    const mixturesRepository = new MixturesRepository()
    const mixture = new Mixtures("1", "Pão")
    mixture.cannotFreeze()
    mixture.activate()

    await mixturesRepository.create(mixture)

    const mixtureModel = await MixturesModel.findOne({
      where: { id: "1" }
    })

    expect(mixtureModel.toJSON()).toStrictEqual({
      id: "1",
      mixture: "Pão",
      can_freeze: false,
      active: true
    })
  })
})