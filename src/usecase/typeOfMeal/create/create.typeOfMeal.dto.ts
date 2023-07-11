export interface InputCreateTypeOfMealUseCaseDto {
  type: string
  dayOfTheWeek: {
    day: string
  },
  active: boolean
}

export interface OutputCreateTypeOfMealUseCaseDto {
  id: string
  type: string
  dayOfTheWeek: {
    day: string
  },
  active: boolean
}