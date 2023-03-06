import DayOfTheWeek from "./dayOfTheWeek"

describe("Day of the week unit tests", () => {

  it("should throw error when day is empty", () => {
    expect(() => {
      let day = new DayOfTheWeek("")

    }).toThrowError("Day is required")
  })

  it("should change day", () => {
    let day = new DayOfTheWeek("Segunda-Feira")
    day.changeDay("Terça-Feira")

    expect(day.day).toBe("Terça-Feira")
  })
})