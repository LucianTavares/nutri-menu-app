import UserRepository from "../../../infrastructure/user/repository/sequelize/user.repository"
import User from "../../../domain/user/entity/user"
import FindUserUseCase from "./find.usecase"

const user = new User("1", "Lucian", "lucian@fc.com.br")
user.activate()

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(user)),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}

describe("Test find User use case", () => {

  it("should find a user", async () => {

    const userRepository = MockRepository()
    const usecase = new FindUserUseCase(userRepository)

    const input = {
      id: "1"
    }

    const output = {
      id: "1",
      name: "Lucian",
      email: "lucian@fc.com.br"
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })

  it("should not find a user", async () => {

    const userRepository = MockRepository()
    userRepository.find.mockImplementation(() => {
      throw new Error("User not found")
    })
    const usecase = new FindUserUseCase(userRepository)

    const input = {
      id: "1"
    }

    expect(() => {
      return usecase.execute(input)
    }).rejects.toThrow("User not found")
  })
})