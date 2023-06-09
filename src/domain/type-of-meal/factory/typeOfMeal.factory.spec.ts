import DayOfTheWeek from "../../today-menu/entity/value-object/dayOfTheWeek"
import TypeOfMealFactory from "./typeOfMeal.factory"

describe("Type Of Meal factory unit test", () => {

  it("should create a type of meal", async () => {

    const typeOfMeal = TypeOfMealFactory.create("Almoço")

    expect(typeOfMeal.id).toBeDefined()
    expect(typeOfMeal.type).toBe("Almoço")
    expect(typeOfMeal.constructor.name).toBe("TypeOfMeal")
  })

  it("should create a type of meal with day of the week", async () => {

    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")

    const typeOfMeal = TypeOfMealFactory.createWithDayOfTheWeek("Café", dayOfTheWeek)

    expect(typeOfMeal.id).toBeDefined()
    expect(typeOfMeal.type).toBe("Café")
    expect(typeOfMeal.DayOfTheWeek.day).toBe("Segunda-Feira")
    expect(typeOfMeal.constructor.name).toBe("TypeOfMeal")
  })
})