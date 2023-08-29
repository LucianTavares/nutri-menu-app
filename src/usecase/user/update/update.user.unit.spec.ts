import UserFactory from "../../../domain/user/factory/user.factory"
import UpdateUserUseCase from "./update.user.usecase"

const user = UserFactory.create(
  "lucian",
  "lucian@fc.com.br"
)

const input = {
  id: user.id,
  name: "Lucian Tavares",
  email: "lucian@fc2.com.br"
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(user)),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  }
} 

describe("Unit test for User update use case", () => {

  it("should update a user", async () => {

    const userRepository = MockRepository()
    const user = new UpdateUserUseCase(userRepository)

    const output = await user.execute(input)

    expect(output).toEqual(input)
  })
})