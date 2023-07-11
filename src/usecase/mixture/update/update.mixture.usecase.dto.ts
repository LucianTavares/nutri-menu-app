export interface InputUpdateMixtureUseCase {
  id: string
  mixture: string
  canFreeze: boolean
  active: boolean
}

export interface OutputUpdateMixtureUseCase {
  id: string
  mixture: string
  canFreeze: boolean
  active: boolean
}