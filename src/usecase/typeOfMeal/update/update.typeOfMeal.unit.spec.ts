import DayOfTheWeek from "../../../domain/today-menu/entity/value-object/dayOfTheWeek";
import TypeOfMealFactory from "../../../domain/type-of-meal/factory/typeOfMeal.factory";
import UpdateTypeOfMealUseCase from "./update.typeOfMeal.usecase";

const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
const typeOfMeal = TypeOfMealFactory.createWithDayOfTheWeek(
  "Almoço",
  dayOfTheWeek
)

const input = {
  id: typeOfMeal.id,
  type: "Café",
  dayOfTheWeek: {
    day: "Terça-Feira"
  }
}

const MockRepository = () => {

  return {
    find: jest.fn().mockReturnValue(Promise.resolve(typeOfMeal)),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}

describe("Unit test for Type Of Meal use case", () => {

  it("should update a type of meal", async () => {

    const typeOfMealRepository = MockRepository()
    const usecase = new UpdateTypeOfMealUseCase(typeOfMealRepository)

    const output = await usecase.execute(input)

    expect(output).toEqual(input)
  })
})