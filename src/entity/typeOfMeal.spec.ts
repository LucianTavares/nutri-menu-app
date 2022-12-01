import DayOfTheWeek from "./dayOfTheWeek"
import TypeOfMeal from "./typeOfMeal"

describe("Type of meal unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let type = new TypeOfMeal("", "Café")
    }).toThrowError("Id is required")
  })

  it("should throw error when type is empty", () => {
    expect(() => {
      let type = new TypeOfMeal("1", "")
    }).toThrowError("Type is required")
  })

  it("should change type", () => {
    let type = new TypeOfMeal("1", "Café")
    type.changeType("Almoço")

    expect(type.type).toBe("Almoço")
  })

  it("should activate type", () => {
    const type = new TypeOfMeal("1", "Café")
    const day = new DayOfTheWeek("1", "Segunda-Feira")
    type.DayOfTheWeek = day

    type.activate()

    expect(type.isActive()).toBe(true)
  })

  it("should throw error when day of the week is undefined when you activate a type", () => {
    expect(() => {
      const type = new TypeOfMeal("1", "Café")
      type.activate()
    }).toThrowError("Day of the week is mandatory to activate a type of meal")
  })

  it("should deactivate type", () => {
    const type = new TypeOfMeal("1", "Café")
    type.deactivate()

    expect(type.isActive()).toBe(false)
  })

})