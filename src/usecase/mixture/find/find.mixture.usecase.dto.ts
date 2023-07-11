export interface InputFindMixtureUseCaseDto {
  id: string
}

export interface OutputFindMixtureUseCaseDto {
  id: string
  mixture: string
  can_freeze: boolean
  active: boolean
}