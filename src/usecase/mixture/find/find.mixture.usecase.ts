import MixturesRepositoryInterface from "../../../domain/mixture/repository/mixtures-repository.interface";
import { InputFindMixtureUseCaseDto, OutputFindMixtureUseCaseDto } from "./find.mixture.usecase.dto";

export default class FindMixtureUseCase {

  private mixtureRepository: MixturesRepositoryInterface

  constructor(mixtureRepository: MixturesRepositoryInterface) {

    this.mixtureRepository = mixtureRepository
  }

  async execute(input: InputFindMixtureUseCaseDto): Promise<OutputFindMixtureUseCaseDto> {

    const mixture = await this.mixtureRepository.find(input.id)

    return {
      id: mixture.id,
      mixture: mixture.mixture,
      can_freeze: mixture.isFreeze(),
      active: mixture.isActive()
    }
  }
}