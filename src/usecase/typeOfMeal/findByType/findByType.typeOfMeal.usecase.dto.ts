export interface InputFindByTypeTypeOfMealUseCaseDto {
  type: string
}

export interface OutputFindByTypeTypeOfMealUseCaseDto {
  id: string
  type: string
  dayOfTheWeek: {
    day: string
  }
  active: boolean
}