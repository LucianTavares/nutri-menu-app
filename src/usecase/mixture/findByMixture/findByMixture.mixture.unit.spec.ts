import Mixture from "../../../domain/mixture/entity/mixture";
import FindByMixtureUseCase from "./findByMixture.mixture.usecase";

const mixture = new Mixture({
  id: "1",
  mixture: "Frango",
  canFreeze: true,
  active: true,
})

const MockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    findByMixture: jest.fn().mockReturnValue(Promise.resolve(mixture)),
  }
}

describe("Unit test mixture use case", () => {

  it("should find a mixture by mixture", async () => {

    const mixtureRepository = MockRepository()
    const usecase = new FindByMixtureUseCase(mixtureRepository)

    const input = {
      mixture: "Frango",
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
    mixtureRepository.findByMixture.mockImplementation(() => {
      throw new Error("Mixture not found")
    })

    const usecase = new FindByMixtureUseCase(mixtureRepository)

    const input = {
      mixture: "Arroz"
    }

    expect(() => {
      return usecase.execute(input)
    }).rejects.toThrow("Mixture not found")
  })
})