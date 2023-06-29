export interface InputFindAllTypeOfMealUseCaseDto {}


type TypeOfMeal = {
  id: string
  type: string
  dayOfTheWeek: {
    day: string
  }
}

export interface OutputFindAllTypeOfMealUseCaseDto {

  typesOfMeal: TypeOfMeal[]
}