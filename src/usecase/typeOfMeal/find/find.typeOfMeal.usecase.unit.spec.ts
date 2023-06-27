import DayOfTheWeek from "../../../domain/today-menu/entity/value-object/dayOfTheWeek";
import TypeOfMeal from "../../../domain/type-of-meal/entity/typeOfMeal";
import FindTypeOfMealUseCase from "./find.typeOfMeal.usecase";

const typeOfMeal = new TypeOfMeal("1", "Almoço")
const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
typeOfMeal.DayOfTheWeek = dayOfTheWeek
typeOfMeal.activate()

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(typeOfMeal)),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}

describe("Unit test find Type Of Meal use case", () => {

  it("should find a type of meal", async () => {

    const typeOfMealRepository = MockRepository()
    const usecase = new FindTypeOfMealUseCase(typeOfMealRepository)

    const input = {
      id: "1"
    }

    const output = {
      id: "1",
      type: "Almoço",
      dayOfTheWeek: {
        day: "Segunda-Feira"
      }
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })

  it("should not find a type of meal", async () => {

    const typeOfMealRepository = MockRepository()
    typeOfMealRepository.find.mockImplementation(() => {
      throw new Error("Type of meal not found")
    })

    const usecase = new FindTypeOfMealUseCase(typeOfMealRepository)

    const input = {
      id: "1"
    }

    expect(() => {
      return usecase.execute(input)
    }).rejects.toThrow("Type of meal not found")
  })
})