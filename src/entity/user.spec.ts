import User from "./user";

describe("User unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let user = new User("", "Lucian", "lucian@fs.com.br");

    }).toThrowError("Id is required");
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      let user = new User("1", "", "lucian@fs.com.br");

    }).toThrowError("Name is required");
  })

  it("should throw error when email is empty", () => {
    expect(() => {
      let user = new User("1", "Lucian", "");

    }).toThrowError("Email is required");
  })

  it("should change name", () => {
    let user = new User("1", "Lucian", "lucian@fs.com.br")
    user.changeName("Lucian Tavares");

    expect(user.name).toBe("Lucian Tavares");
  })

  it("should change email", () => {
    let user = new User("1", "Lucian", "lucian@fs.com.br")
    user.changeEmail("lucian@fullc.com.br");

    expect(user.email).toBe("lucian@fullc.com.br");
  })

  it("should activate user", () => {
    const user = new User("1", "Lucian", "lucian@fs.com.br")
    user.activate();

    expect(user.isActive()).toBe(true);
  })

  it("should deactivate user", () => {
    const user = new User("1", "Lucian", "lucian@fs.com.br")
    user.deactivate();

    expect(user.isActive()).toBe(false);
  })

  it("should throw error when try activate user when id is empty", () => {
    expect(() => {
      let user = new User("", "Lucian", "lucian@fs.com.br");
      user.activate();
    }).toThrowError("Id is required")
  })

  it("should throw error when try activate user when name is empty", () => {
    expect(() => {
      let user = new User("1", "", "lucian@fs.com.br");
      user.activate();
    }).toThrowError("Name is required")
  })

  it("should throw error when try activate user when email is empty", () => {
    expect(() => {
      let user = new User("1", "Lucian", "");
      user.activate();
    }).toThrowError("Email is required")
  })

});