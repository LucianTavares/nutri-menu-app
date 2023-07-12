import DayOfTheWeek from "../../../domain/today-menu/entity/value-object/dayOfTheWeek";
import TypeOfMeal from "../../../domain/type-of-meal/entity/typeOfMeal";
import FindByTypeTypeOfMealUseCase from "./findByType.typeOfMeal.usecase";

const typeOfMeal = new TypeOfMeal({id: "1", type: "Almoço"})
const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
typeOfMeal.DayOfTheWeek = dayOfTheWeek
typeOfMeal.activate()

const MockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    findByType: jest.fn().mockReturnValue(Promise.resolve(typeOfMeal))
  }
}

describe("Unit test find Type Of Meal use case", () => {

  it("should find by type a type of meal", async () => {

    const typeOfMealRepository = MockRepository()
    const usecase = new FindByTypeTypeOfMealUseCase(typeOfMealRepository)

    const input = {
      type: "Almoço"
    }

    const output = {
      id: "1",
      type: "Almoço",
      dayOfTheWeek: {
        day: "Segunda-Feira"
      },
      active: true
    }

    const result = await usecase.findByType(input)

    expect(result).toEqual(output)
  })

  it("should not find a type of meal", async () => {

    const typeOfMealRepository = MockRepository()
    typeOfMealRepository.findByType.mockImplementation(() => {
      throw new Error("Type of meal not found")
    })

    const usecase = new FindByTypeTypeOfMealUseCase(typeOfMealRepository)

    const input = {
      type: "Almoço"
    }

    expect(() => {
      return usecase.findByType(input)
    }).rejects.toThrow("Type of meal not found")
  })
})