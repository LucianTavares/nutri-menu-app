import User from "../../../domain/user/entity/user"
import CreateUserUseCase from "./create.user"

const input = {
  name: "Lucian",
  email: "lucian@fc.com.br"
}

const MockRepository = () => {

  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}

describe("Unit test create User use case", () => {

  it("should create a customer", async () => {

    const userRepository = MockRepository()
    const usecase = new CreateUserUseCase(userRepository)

    const output = await usecase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      email: input.email
    })
  })

  it("should throw an error when name is missing", async () => {

    const userRepository = MockRepository()
    const usecase = new CreateUserUseCase(userRepository)

    input.name = ""

    await expect(usecase.execute(input)).rejects.toThrow(
      "Name is required"
    )
  })

  it("should throw an error when name is missing", async () => {

    const userRepository = MockRepository()
    const usecase = new CreateUserUseCase(userRepository)

    input.name = "Lucian"
    input.email = ""

    await expect(usecase.execute(input)).rejects.toThrow(
      "Email is required"
    )
  })
})