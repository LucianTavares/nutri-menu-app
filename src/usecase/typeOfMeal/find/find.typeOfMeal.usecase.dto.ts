export interface InputFindTypeOfMealUseCaseDto {
  id: string
}

export interface OutputFindTypeOfMealUseCaseDto {
  id: string
  type: string
  dayOfTheWeek: {
    day: string
  }
}