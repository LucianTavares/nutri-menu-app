import DayOfTheWeek from "./dayOfTheWeek"

describe("Day of the week unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let day = new DayOfTheWeek("", "Segunda-Feira")
    
    }).toThrowError("Id is required")
  })

  it("should throw error when day is empty", () => {
    expect(() => {
      let day = new DayOfTheWeek("1", "")

    }).toThrowError("Day is required")
  })

  it("should change day", () => {
    let day = new DayOfTheWeek("1", "Segunda-Feira")
    day.changeDay("Terça-Feira")

    expect(day.day).toBe("Terça-Feira")
  })

  it("should activate day", () => {
    const day = new DayOfTheWeek("1", "Segunda-Feira")
    day.activate();

    expect(day.isActive()).toBe(true)
  })

  it("should deactivate day", () => {
    const day = new DayOfTheWeek("1", "Segunda-Feira")
    day.deactivate();

    expect(day.isActive()).toBe(false)
  })

  it("should throw error when try activate day when id is empty", () => {
    expect(() => {
      let day = new DayOfTheWeek("", "Segunda-Feira")
      day.activate()
    }).toThrowError("Id is required")
  })

  it("should throw error when try activate day when day is empty", () => {
    expect(() => {
      let day = new DayOfTheWeek("1", "")
      day.activate()
    }).toThrowError("Day is required")
  })
})