import Mixture from "../../../domain/mixture/entity/mixture";
import UpdateMixtureUseCase from "./update.mixture.usecase";

const mixture = new Mixture({
  id: "1",
  mixture: "Frango",
  canFreeze: true,
  active: true,
})

const input = {
  id: mixture.id,
  mixture: "Carne",
  canFreeze: false,
  active: true
}

const MockRepository = () => {

  return {
    find: jest.fn().mockReturnValue(Promise.resolve(mixture)),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  }
}

describe("Unit test Mixture use case", () => {

  it("should update a mixture", async () => {

    const mixtureRepository = MockRepository()
    const usecase = new UpdateMixtureUseCase(mixtureRepository)

    const output = await usecase.execute(input)

    expect(output).toEqual(input)
  })
})