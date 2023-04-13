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
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async find(id: string): Promise<Mixtures> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Mixtures[]> {
    throw new Error("Method not implemented.");
  }

}