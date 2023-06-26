import CreateTypeOfMealUseCase from "./create.typeOfMeal"

const input = {
  type: "Almoço",
  dayOfTheWeek: {
    day: "Terça-Feira"
  }
}

const MockRepository = () => {

  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}

describe("Unit test create Type Of Meal use case", () => {

  it("should create a type of meal", async () => {

    const typeOfMealRepository = MockRepository()
    const usecase = new CreateTypeOfMealUseCase(typeOfMealRepository)

    const output = await usecase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      type: input.type,
      dayOfTheWeek: {
        day: input.dayOfTheWeek.day
      }
    })
  })

  it("should throw an error when type is missing", async () => {

    const typeOfMealRepository = MockRepository()
    const usecase = new CreateTypeOfMealUseCase(typeOfMealRepository)

    input.type = ""

    await expect(usecase.execute(input)).rejects.toThrow(
      "Type is required"
    )
  })

  it("should throw an error when type is missing", async () => {

    const typeOfMealRepository = MockRepository()
    const usecase = new CreateTypeOfMealUseCase(typeOfMealRepository)

    input.type = "Almoço"
    input.dayOfTheWeek.day = ""

    await expect(usecase.execute(input)).rejects.toThrow(
      "Day is required"
    )
  })
})