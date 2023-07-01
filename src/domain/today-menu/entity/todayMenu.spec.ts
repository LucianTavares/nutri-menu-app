import Mixtures from "../../mixture/entity/mixture"
import TypeOfMeal from "../../type-of-meal/entity/typeOfMeal"
import User from "../../user/entity/user"
import TodayMenu from "./todayMenu"

describe("Today menu unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const user = new User("1", "Lucian", "lucian@fc.com.br")
      let mixture = new Mixtures({id: "1", mixture: "Pão"})
      const typeOfMeal = new TypeOfMeal("1", "Café")
      let menu = new TodayMenu({id: "", mixtures: [mixture], typeOfMeal: [typeOfMeal], userId: user.id})
    }).toThrowError("Id is required")
  })

  it("should throw error when mixture is empty", () => {
    expect(() => {
      const user = new User("1", "Lucian", "lucian@fc.com.br")
      const typeOfMeal = new TypeOfMeal("1", "Café")
      let menu = new TodayMenu({id: "1", mixtures: [], typeOfMeal: [typeOfMeal], userId: user.id})
    }).toThrowError("Mixture is required")
  })

  it("should throw error when type of meal is empty", () => {
    expect(() => {
      const user = new User("1", "Lucian", "lucian@fc.com.br")
      let mixture = new Mixtures({id: "1", mixture: "Pão"})
      let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: [], userId: user.id})
    }).toThrowError("Type of meal is required")
  })

  it("should throw error when user id is empty", () => {
    expect(() => {
      let mixture = new Mixtures({id: "1", mixture: "Pão"})
      const typeOfMeal = new TypeOfMeal("1", "Café")
      let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal], userId: ""})
    }).toThrowError("User Id is required")
  })

  it("should change to frozen", () => {
    const user = new User("1", "Lucian", "lucian@fc.com.br")
    const mixture = new Mixtures({id: "1", mixture: "Pão"})
    const typeOfMeal = new TypeOfMeal("1", "Café")
    let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal], userId: user.id})
    menu.freeze()

    expect(menu.isFrozen()).toBe(true)
  })

  it("should change to not frozen", () => {
    const user = new User("1", "Lucian", "lucian@fc.com.br")
    const mixture = new Mixtures({id: "1", mixture: "Pão"})
    const typeOfMeal = new TypeOfMeal("1", "Café")
    let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal], userId: user.id})
    menu.unfreeze()

    expect(menu.isFrozen()).toBe(false)
  })

  it("should activate today menu", () => {
    const user = new User("1", "Lucian", "lucian@fc.com.br")
    const mixture = new Mixtures({id: "1", mixture: "Pão"})
    const typeOfMeal = new TypeOfMeal("1", "Café")
    let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal], userId: user.id})
    menu.activate()

    expect(menu.isActive()).toBe(true)
  })

  it("should deactivate today menu", () => {
    const user = new User("1", "Lucian", "lucian@fc.com.br")
    const mixture = new Mixtures({id: "1", mixture: "Pão"})
    const typeOfMeal = new TypeOfMeal("1", "Café")
    let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal], userId: user.id})
    menu.deactivate()

    expect(menu.isActive()).toBe(false)
  })

  it("should throw error when try activate menu when id is empty", () => {
    expect(() => {
      const user = new User("1", "Lucian", "lucian@fc.com.br")
      const mixture = new Mixtures({id: "1", mixture: "Pão"})
      const typeOfMeal = new TypeOfMeal("1", "Café")
      let menu = new TodayMenu({id: "", mixtures: [mixture], typeOfMeal: [typeOfMeal], userId: user.id})
      menu.activate()
    }).toThrowError("Id is required")
  })

  it("should throw error when try activate menu when mixture is empty", () => {
    expect(() => {
      const user = new User("1", "Lucian", "lucian@fc.com.br")
      const typeOfMeal = new TypeOfMeal("1", "Café")
      let menu = new TodayMenu({id: "1", mixtures: [], typeOfMeal: [typeOfMeal], userId: user.id})
      menu.activate()
    }).toThrowError("Mixture is required")
  })

  it("should throw error when try activate menu when type of meal id is empty", () => {
    expect(() => {
      const user = new User("1", "Lucian", "lucian@fc.com.br")
      const mixture = new Mixtures({id: "1", mixture: "Pão"})
      let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: [], userId: user.id})
      menu.activate()
    }).toThrowError("Type of meal is required")
  })

  it("should throw error when try activate menu when user id is empty", () => {
    expect(() => {

      const user = new User("1", "Lucian", "lucian@fc.com.br")
      const mixture = new Mixtures({id: "1", mixture: "Pão"})
      const typeOfMeal = new TypeOfMeal("1", "Café")
      let menu = new TodayMenu({id: "1", mixtures: [mixture], typeOfMeal: [typeOfMeal], userId: ""})
      menu.activate()
    }).toThrowError("User Id is required")

  })
})