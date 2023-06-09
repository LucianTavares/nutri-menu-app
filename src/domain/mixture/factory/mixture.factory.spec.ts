import MixtureFactory from "./mixture.factory"

describe("Mixture factory unit test", () => {

  it("should create a mixture", async () => {

    const mixture = MixtureFactory.create("Pão")

    expect(mixture.id).toBeDefined()
    expect(mixture.mixture).toBe("Pão")
    expect(mixture.constructor.name).toBe("Mixture")
  })
})