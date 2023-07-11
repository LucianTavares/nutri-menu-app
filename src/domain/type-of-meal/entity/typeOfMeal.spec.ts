import DayOfTheWeek from "../../today-menu/entity/value-object/dayOfTheWeek"
import TypeOfMeal from "./typeOfMeal"

describe("Type of meal unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let type = new TypeOfMeal({id: "", type: "Café"})
    }).toThrowError("Id is required")
  })

  it("should throw error when type is empty", () => {
    expect(() => {
      let type = new TypeOfMeal({id: "1", type: ""})
    }).toThrowError("Type is required")
  })

  it("should change type", () => {
    let type = new TypeOfMeal({id: "1", type: "Café"})
    type.changeType("Almoço")

    expect(type.type).toBe("Almoço")
  })

  it("should activate type", () => {
    const type = new TypeOfMeal({id: "1", type: "Café"})
    const day = new DayOfTheWeek("Segunda-Feira")
    type.DayOfTheWeek = day

    type.activate()

    expect(type.isActive()).toBe(true)
  })

  it("should throw error when day of the week is undefined when you activate a type", () => {
    expect(() => {
      const type = new TypeOfMeal({id: "1", type: "Café"})
      type.activate()
    }).toThrowError("Day of the week is mandatory to activate a type of meal")
  })

  it("should deactivate type", () => {
    const type = new TypeOfMeal({id: "1", type: "Café"})
    type.deactivate()

    expect(type.isActive()).toBe(false)
  })

})