import DayOfTheWeek from "../../../domain/today-menu/entity/value-object/dayOfTheWeek";
import TypeOfMealFactory from "../../../domain/type-of-meal/factory/typeOfMeal.factory";
import FindAllTypeOfMealUseCase from "./findAll.typeOfMeal.usecase";

const dayOfTheWeekOne = new DayOfTheWeek("Segunda-Feira")
const dayOfTheWeekTwo = new DayOfTheWeek("Terça-Feira")

const typeOfMealOne = TypeOfMealFactory.createWithDayOfTheWeek(
  "Café",
  dayOfTheWeekOne,
  )
  typeOfMealOne.activate()

const typeOfMealTwo = TypeOfMealFactory.createWithDayOfTheWeek(
  "Almoço",
  dayOfTheWeekTwo
)

const MockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([typeOfMealOne, typeOfMealTwo])),
  }
}

describe("Unit test find all Type Of Meal use case", () => {

  it("should find all a type of meal", async () => {

    const typeOfMealRepository = MockRepository()
    const usecase = new FindAllTypeOfMealUseCase(typeOfMealRepository)

    const output = await usecase.execute({})

    expect(output.typesOfMeal.length).toBe(2)

    expect(output.typesOfMeal[0].id).toBe(typeOfMealOne.id)
    expect(output.typesOfMeal[0].type).toBe(typeOfMealOne.type)
    expect(output.typesOfMeal[0].dayOfTheWeek.day).toBe(typeOfMealOne.DayOfTheWeek.day)
    expect(output.typesOfMeal[0].active).toBe(typeOfMealOne.isActive())

    expect(output.typesOfMeal[1].id).toBe(typeOfMealTwo.id)
    expect(output.typesOfMeal[1].type).toBe(typeOfMealTwo.type)
    expect(output.typesOfMeal[1].dayOfTheWeek.day).toBe(typeOfMealTwo.DayOfTheWeek.day)
    expect(output.typesOfMeal[1].active).toBe(typeOfMealTwo.isActive())
  })
})