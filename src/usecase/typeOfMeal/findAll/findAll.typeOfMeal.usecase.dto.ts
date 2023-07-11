export interface InputFindAllTypeOfMealUseCaseDto {}


type TypeOfMeal = {
  id: string
  type: string
  dayOfTheWeek: {
    day: string
  }
  active: boolean
}

export interface OutputFindAllTypeOfMealUseCaseDto {

  typesOfMeal: TypeOfMeal[]
}