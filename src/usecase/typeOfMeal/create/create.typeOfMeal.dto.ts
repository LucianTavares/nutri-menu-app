export interface InputCreateTypeOfMealUseCaseDto {
  type: string
  dayOfTheWeek: {
    day: string
  }
}

export interface OutputCreateTypeOfMealUseCaseDto {
  id: string
  type: string
  dayOfTheWeek: {
    day: string
  }
}