import Mixtures from "../../domain/entity/mixtures";
import MixturesRepositoryInterface from "../../domain/repository/mixtures-repository.interface";
import MixturesModel from "../database/sequelize/model/mixtures.model";

export default class MixturesRepository implements MixturesRepositoryInterface {

  async create(entity: Mixtures): Promise<void> {

    await MixturesModel.create({
      id: entity._id,
      mixture: entity.mixture,
      can_freeze: entity.isFreeze(),
      active: entity.isActive()
    })
  }

  async update(entity: Mixtures): Promise<void> {

    await MixturesModel.update(
      {
        mixture: entity.mixture
      },
      {
        where: {
          id: entity._id
        }
      }
    )
  }

  async delete(id: string): Promise<void> {

    await MixturesModel.destroy(
      {
        where: { id: id }
      }
    )
  }

  async find(id: string): Promise<Mixtures> {

    const mixture = await MixturesModel.findOne(
      {
        where: { id: id }
      }
    )

    return new Mixtures(
      mixture.id,
      mixture.mixture
    )
  }

  async findByMixture(mixture: string): Promise<Mixtures> {

    const mixtureModel = await MixturesModel.findOne(
      {
        where: { mixture: mixture }
      }
    )

    return new Mixtures(
      mixtureModel.id,
      mixtureModel.mixture
    )
  }

  async findAll(): Promise<Mixtures[]> {

    const mixturesModel = await MixturesModel.findAll()

    const mixtures = mixturesModel.map((mixtureModel) => {
      let mixture = new Mixtures(
        mixtureModel.id,
        mixtureModel.mixture
      )
      if (mixtureModel.active) {
        mixture.activate()
      }
      return mixture
    })

    return mixtures
  }
}