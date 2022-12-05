import Mixtures from "./mixtures"
import TodayMenu from "./todayMenu"

describe("Today menu unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let menu = new TodayMenu("", [], "1")
    }).toThrowError("Id is required")
  })

  it("should throw error when mixture is empty", () => {
    expect(() => {
      let menu = new TodayMenu("1", [], "1")
    }).toThrowError("Mixture is required")
  })

  it("should throw error when type of meal Id is empty", () => {
    expect(() => {
      let mixture = new Mixtures("1", "Pão")
      let menu = new TodayMenu("1", [mixture], "")
    }).toThrowError("Type of meal id is required")
  })

  it("should change to frozen", () => {
    const mixture = new Mixtures("1", "Pão")
    const menu = new TodayMenu("1", [mixture], "1")
    menu.freeze()

    expect(menu.isFrozen()).toBe(true)
  })

  it("should change to not frozen", () => {
    const mixture = new Mixtures("1", "Pão")
    const menu = new TodayMenu("1", [mixture], "1")
    menu.unfreeze()

    expect(menu.isFrozen()).toBe(false)
  })

  it("should activate today menu", () => {
    const mixture = new Mixtures("1", "Pão")
    const menu = new TodayMenu("1", [mixture], "1")
    menu.activate()

    expect(menu.isActive()).toBe(true)
  })

  it("should deactivate today menu", () => {
    const mixture = new Mixtures("1", "Pão")
    const menu = new TodayMenu("1", [mixture], "1")
    menu.deactivate()

    expect(menu.isActive()).toBe(false)
  })

  it("should throw error when try activate menu when id is empty", () => {
    expect(() => {
      const mixture = new Mixtures("1", "Pão")
      const menu = new TodayMenu("", [mixture], "1")
      menu.activate()
    }).toThrowError("Id is required")
  })

  it("should throw error when try activate menu when mixture is empty", () => {
    expect(() => {
      const menu = new TodayMenu("1", [], "1")
      menu.activate()
    }).toThrowError("Mixture is required")
  })

  it("should throw error when try activate menu when type of meal id is empty", () => {
    expect(() => {
      const mixture = new Mixtures("1", "Pão")
      const menu = new TodayMenu("1", [mixture], "")
      menu.activate()
    }).toThrowError("Type of meal id is required")
  })

})