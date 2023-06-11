import UserFactory from "./user.factory"

describe("User factory unit test", () => {

  it("should create a user", async () => {

    const user = UserFactory.create("Lucian", "lucian@fc.com")

    expect(user.id).toBeDefined()
    expect(user.name).toBe("Lucian")
    expect(user.email).toBe("lucian@fc.com")
  })
})