export interface InputFindByMixtureMixtureUseCaseDto {
  mixture: string
}

export interface OutputFindByMixtureMixtureUseCaseDto {
  id: string
  mixture: string
  can_freeze: boolean
  active: boolean
}