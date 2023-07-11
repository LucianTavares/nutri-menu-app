import Mixture from "./mixture"

describe("Mixtures unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let mixture = new Mixture({id: "", mixture: "Pão"})
    }).toThrowError("Id is required")
  })

  it("should when mixture is empty", () => {
    expect(() => {
      let mixture = new Mixture({id: "1", mixture: ""})
    }).toThrowError("Mixture is required")
  })

  it("should change mixture", () => {
    let mixture = new Mixture({id: "1", mixture: "Pão Francês"})
    mixture.changeMixture("Pão Integral")

    expect(mixture.mixture).toBe("Pão Integral")
  })

  it("should change to be able freeze", () => {
    let mixture = new Mixture({id: "1", mixture: "Pão"})
    mixture.canFreeze()

    expect(mixture.isFreeze()).toBe(true)
  })

  it("should change to not be able freeze", () => {
    let mixture = new Mixture({id: "1", mixture: "Pão"})
    mixture.cannotFreeze()

    expect(mixture.isFreeze()).toBe(false)
  })

  it("should activate mixture", () => {
    const mixture = new Mixture({id: "1", mixture: "Pão"})
    mixture.activate()

    expect(mixture.isActive()).toBe(true)
  })

  it("should deactivate mixture", () => {
    const mixture = new Mixture({id: "1", mixture: "Pão"})
    mixture.deactivate()

    expect(mixture.isActive()).toBe(false)
  })

  it("should throw error when try activate mixture when id is empty", () => {
    expect(() => {
      const mixture = new Mixture({id: "", mixture: "Pão"})
      mixture.activate()
    }).toThrowError("Id is required")
  })

  it("should throw error when try activate mixture when mixture is empty", () => {
    expect(() => {
      const mixture = new Mixture({id: "1", mixture: ""})
      mixture.activate()
    }).toThrowError("Mixture is required")
  })

})