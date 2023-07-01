import CreateMixtureUseCase from "./create.mixture.usecase"

const input = {
  mixture: "Pão",
  can_freeze: false,
  active: true
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  }
}

describe("Unit test create Mixture use case", () => {

  it("should create a mixture", async () => {

    const mixtureRepository = MockRepository()
    const usecase = new CreateMixtureUseCase(mixtureRepository)

    const output = await usecase.execute(input)

    console.log(output)

    expect(output).toEqual({
      id: expect.any(String),
      mixture: input.mixture,
      can_freeze: false,
      active: true
    })
  })
})

