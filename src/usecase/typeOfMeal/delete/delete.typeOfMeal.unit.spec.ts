import DayOfTheWeek from "../../../domain/today-menu/entity/value-object/dayOfTheWeek"
import TypeOfMeal from "../../../domain/type-of-meal/entity/typeOfMeal"
import TypeOfMealFactory from "../../../domain/type-of-meal/factory/typeOfMeal.factory"
import DeleteTypeOfMealUseCase from "./delete.typeOfMeal"

const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
const typeOfMeal = TypeOfMealFactory.createWithDayOfTheWeek(
  "Almoço",
  dayOfTheWeek
)

const input = {
  id: "1"
}

const inputTypeOfMeal = {
  id: typeOfMeal.id,
  type: "Café",
  dayOfTheWeek: {
    day: "Terça-Feira"
  }
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(inputTypeOfMeal)),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn().mockResolvedValue(null),
  }
}

describe("Unit test delete Type Of Meal use case", () => {


  it("should delete a type of meal", async () => {

    const typeOfMealRepository = MockRepository()
    const usecase = new DeleteTypeOfMealUseCase(typeOfMealRepository)

    const deleteType = jest.spyOn(typeOfMealRepository, 'delete')

    await usecase.execute(input)

    expect(deleteType).toHaveBeenCalledWith(expect.any(String))
  })
})