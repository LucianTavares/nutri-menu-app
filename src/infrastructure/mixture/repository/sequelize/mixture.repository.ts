
import Mixture from "../../../../domain/mixture/entity/mixture";
import MixturesRepositoryInterface from "../../../../domain/mixture/repository/mixtures-repository.interface";
import MixturesModel from "./mixtures.model";

export default class MixturesRepository implements MixturesRepositoryInterface {

  async create(entity: Mixture): Promise<void> {

    await MixturesModel.create({
      id: entity.id,
      mixture: entity.mixture,
      can_freeze: entity.isFreeze(),
      active: entity.isActive()
    })
  }

  async update(entity: Mixture): Promise<void> {

    await MixturesModel.update(
      {
        mixture: entity.mixture
      },
      {
        where: {
          id: entity.id
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

  async find(id: string): Promise<Mixture> {

    const mixture = await MixturesModel.findOne(
      {
        where: { id: id }
      }
    )

    return new Mixture(
      {
        id: mixture.id,
        mixture: mixture.mixture
      }
    )
  }

  async findByMixture(mixture: string): Promise<Mixture> {

    const mixtureModel = await MixturesModel.findOne(
      {
        where: { mixture: mixture }
      }
    )

    return new Mixture({
      id: mixtureModel.id,
      mixture: mixtureModel.mixture
    })
  }

  async findAll(): Promise<Mixture[]> {

    const mixturesModel = await MixturesModel.findAll()

    const mixtures = mixturesModel.map((mixtureModel) => {
      let mixture = new Mixture({
        id: mixtureModel.id,
        mixture: mixtureModel.mixture
      })
      if (mixtureModel.active) {
        mixture.activate()
      }
      return mixture
    })

    return mixtures
  }
}