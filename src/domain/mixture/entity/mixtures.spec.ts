import Mixtures from "./mixtures"

describe("Mixtures unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let mixture = new Mixtures("", "Pão")
    }).toThrowError("Id is required")
  })

  it("should when mixture is empty", () => {
    expect(() => {
      let mixture = new Mixtures("1", "")
    }).toThrowError("Mixture is required")
  })

  it("should change mixture", () => {
    let mixture = new Mixtures("1", "Pão Francês")
    mixture.changeMixture("Pão Integral")

    expect(mixture.mixture).toBe("Pão Integral")
  })

  it("should change to be able freeze", () => {
    let mixture = new Mixtures("1", "Pão")
    mixture.canFreeze()

    expect(mixture.isFreeze()).toBe(true)
  })

  it("should change to not be able freeze", () => {
    let mixture = new Mixtures("1", "Pão")
    mixture.cannotFreeze()

    expect(mixture.isFreeze()).toBe(false)
  })

  it("should activate mixture", () => {
    const mixture = new Mixtures("1", "Pão")
    mixture.activate()

    expect(mixture.isActive()).toBe(true)
  })

  it("should deactivate mixture", () => {
    const mixture = new Mixtures("1", "Pão")
    mixture.deactivate()

    expect(mixture.isActive()).toBe(false)
  })

  it("should throw error when try activate mixture when id is empty", () => {
    expect(() => {
      const mixture = new Mixtures("", "Pão")
      mixture.activate()
    }).toThrowError("Id is required")
  })

  it("should throw error when try activate mixture when mixture is empty", () => {
    expect(() => {
      const mixture = new Mixtures("1", "")
      mixture.activate()
    }).toThrowError("Mixture is required")
  })

})