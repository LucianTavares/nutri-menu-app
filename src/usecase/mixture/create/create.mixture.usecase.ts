import Mixture from "../../../domain/mixture/entity/mixture";
import MixturesRepositoryInterface from "../../../domain/mixture/repository/mixtures-repository.interface";
import { InputCreateMixtureUseCaseDto, OutputCreateMixtureUseCaseDto } from "./create.mixture.usecase.dto";
import { v4 as uuid } from 'uuid'

export default class CreateMixtureUseCase {

  private mixtureRepository: MixturesRepositoryInterface

  constructor(mixtureRepository: MixturesRepositoryInterface) {
    this.mixtureRepository = mixtureRepository
  }

  async execute(input: InputCreateMixtureUseCaseDto): Promise<OutputCreateMixtureUseCaseDto> {

    const mixtureId = uuid()

    const props = {
      id: mixtureId,
      mixture: input.mixture,
      can_freeze: input.can_freeze,
      active: input.active,
    }

    const mixture = new Mixture({
      id: props.id,
      mixture: props.mixture,
      canFreeze: props.can_freeze,
      active: props.active,
    })


    await this.mixtureRepository.create(mixture)

    return {
      id: mixture.id,
      mixture: mixture.mixture,
      can_freeze: mixture.isFreeze(),
      active: mixture.isActive(),
    }
  }
}