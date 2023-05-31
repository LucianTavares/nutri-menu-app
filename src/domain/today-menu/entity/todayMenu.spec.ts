import Mixtures from "../../mixture/entity/mixtures"
import TypeOfMeal from "../../type-of-meal/entity/typeOfMeal"
import TodayMenu from "./todayMenu"

describe("Today menu unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let mixture = new Mixtures("1", "Pão")
      const typeOfMeal = new TypeOfMeal("1", "Café")
      let menu = new TodayMenu({id: "", mixtures: [mixture], typeOfMeal: [typeOfMeal]})
    }).toThrowError("Id is required")
  })

  it("should throw error when mixture is empty", () => {
    expect(() => {
      const typeOfMeal = new TypeOfMeal("1", "Café")
      let menu = new TodayMenu({id: "1", mixtures: [], typeOfMeal: [typeOfMeal]})
    }).toThrowError("Mixture is required")
  })

  it("should throw error when type of meal is empty", () => {
    expect(() => {
      let mixture = new Mixtures("1", "Pão")
      let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: []})
    }).toThrowError("Type of meal is required")
  })

  it("should change to frozen", () => {
    const mixture = new Mixtures("1", "Pão")
    const typeOfMeal = new TypeOfMeal("1", "Café")
    let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal]})
    menu.freeze()

    expect(menu.isFrozen()).toBe(true)
  })

  it("should change to not frozen", () => {
    const mixture = new Mixtures("1", "Pão")
    const typeOfMeal = new TypeOfMeal("1", "Café")
    let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal]})
    menu.unfreeze()

    expect(menu.isFrozen()).toBe(false)
  })

  it("should activate today menu", () => {
    const mixture = new Mixtures("1", "Pão")
    const typeOfMeal = new TypeOfMeal("1", "Café")
    let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal]})
    menu.activate()

    expect(menu.isActive()).toBe(true)
  })

  it("should deactivate today menu", () => {
    const mixture = new Mixtures("1", "Pão")
    const typeOfMeal = new TypeOfMeal("1", "Café")
    let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal]})
    menu.deactivate()

    expect(menu.isActive()).toBe(false)
  })

  it("should throw error when try activate menu when id is empty", () => {
    expect(() => {
      const mixture = new Mixtures("1", "Pão")
      const typeOfMeal = new TypeOfMeal("1", "Café")
      let menu = new TodayMenu({id: "", mixtures: [mixture], typeOfMeal: [typeOfMeal]})
      menu.activate()
    }).toThrowError("Id is required")
  })

  it("should throw error when try activate menu when mixture is empty", () => {
    expect(() => {
      const typeOfMeal = new TypeOfMeal("1", "Café")
      let menu = new TodayMenu({id: "1", mixtures: [], typeOfMeal: [typeOfMeal]})
      menu.activate()
    }).toThrowError("Mixture is required")
  })

  it("should throw error when try activate menu when type of meal id is empty", () => {
    expect(() => {
      const mixture = new Mixtures("1", "Pão")
      let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: []})
      menu.activate()
    }).toThrowError("Type of meal is required")
  })

})