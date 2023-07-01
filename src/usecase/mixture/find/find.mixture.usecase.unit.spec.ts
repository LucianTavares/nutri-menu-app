import Mixture from "../../../domain/mixture/entity/mixture";
import FindMixtureUseCase from "./find.mixture.usecase";

const mixture = new Mixture({
  id: "1",
  mixture: "Frango",
  canFreeze: true,
  active: true,
})

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(mixture)),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  }
}

describe("Unit test mixture use case", () => {

  it("should find a mixture by id", async () => {

    const mixtureRepository = MockRepository()
    const usecase = new FindMixtureUseCase(mixtureRepository)

    const input = {
      id: "1",
    }

    const output = {
      id: "1",
      mixture: "Frango",
      can_freeze: true,
      active: true
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })

  it("should not find a mixture", async () => {

    const mixtureRepository = MockRepository()
    mixtureRepository.find.mockImplementation(() => {
      throw new Error("Mixture not found")
    })

    const usecase = new FindMixtureUseCase(mixtureRepository)

    const input = {
      id: "1"
    }

    expect(() => {
      return usecase.execute(input)
    }).rejects.toThrow("Mixture not found")
  })
})