import MixturesRepositoryInterface from "../../../domain/mixture/repository/mixtures-repository.interface";
import { InputUpdateMixtureUseCase, OutputUpdateMixtureUseCase } from "./update.mixture.usecase.dto";

export default class UpdateMixtureUseCase {

  private mixtureRepository: MixturesRepositoryInterface

  constructor(mixtureRepository: MixturesRepositoryInterface) {
    this.mixtureRepository = mixtureRepository;
  }

  async execute(input: InputUpdateMixtureUseCase): Promise<OutputUpdateMixtureUseCase> {

    const mixture = await this.mixtureRepository.find(input.id)

    mixture.changeMixture(input.mixture)
    mixture.isActive() === true ? mixture.deactivate() : mixture.activate()
    mixture.isFreeze() === true ? mixture.cannotFreeze() : mixture.canFreeze()

    await this.mixtureRepository.update(mixture)

    return {
      id: input.id,
      mixture: input.mixture,
      canFreeze: input.canFreeze,
      active: input.active
    }
  }
}