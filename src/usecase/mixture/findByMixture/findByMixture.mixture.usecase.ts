import MixturesRepositoryInterface from "../../../domain/mixture/repository/mixtures-repository.interface";
import { InputFindByMixtureMixtureUseCaseDto, OutputFindByMixtureMixtureUseCaseDto } from "./findByMixture.mixture.usecase.dto";

export default class FindByMixtureUseCase {

  private mixtureRepository: MixturesRepositoryInterface

  constructor(mixtureRepository: MixturesRepositoryInterface) {
    this.mixtureRepository = mixtureRepository;
  }

  async execute(input: InputFindByMixtureMixtureUseCaseDto): Promise<OutputFindByMixtureMixtureUseCaseDto> {

    const mixture = await this.mixtureRepository.findByMixture(input.mixture)

    return {
      id: mixture.id,
      mixture: mixture.mixture,
      can_freeze: mixture.isFreeze(),
      active: mixture.isActive()
    }
  }
}