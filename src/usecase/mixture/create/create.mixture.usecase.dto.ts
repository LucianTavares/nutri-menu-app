export interface InputCreateMixtureUseCaseDto {
  mixture: string
  can_freeze: boolean
  active: boolean
}

export interface OutputCreateMixtureUseCaseDto {
  id: string
  mixture: string
  can_freeze: boolean
  active: boolean
}