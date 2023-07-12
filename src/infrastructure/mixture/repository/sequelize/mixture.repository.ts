
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
        mixture: entity.mixture,
        canFreeze: entity.isFreeze(),
        active: entity.isActive()
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

    let mixture
    try {
      mixture = await MixturesModel.findOne(
        {
          where: { id: id }
        }
      )
    } catch (err) {
      throw new Error("Mixture not found")
    }

    return new Mixture(
      {
        id: mixture.id,
        mixture: mixture.mixture,
        canFreeze: mixture.can_freeze,
        active: mixture.active
      }
    )
  }

  async findByMixture(mixture: string): Promise<Mixture> {

    let mixtureModel
    try {
      mixtureModel = await MixturesModel.findOne(
        {
          where: { mixture: mixture }
        }
      )
    } catch (err) {
      throw new Error("Mixture not found")
    }

    return new Mixture({
      id: mixtureModel.id,
      mixture: mixtureModel.mixture,
      canFreeze: mixtureModel.can_freeze,
      active: mixtureModel.active
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