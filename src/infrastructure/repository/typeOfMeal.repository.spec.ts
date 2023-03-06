import { Sequelize } from "sequelize-typescript"
import TypeOfMealModel from "../database/sequelize/model/typeOfMeal.model";
import TypeOfMeal from "../../domain/entity/typeOfMeal";
import TypeOfMealRepository from "./typeOfMeal.repository";
import DayOfTheWeek from "../../domain/entity/value-object/dayOfTheWeek";
import { join } from "path"

describe("Type of meal repository tests", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: join(__dirname, '../../../database.sqlite'),
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([TypeOfMealModel]);
    await sequelize.sync();

  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a type of meal", async () => {
    const typeOfMealRepository = new TypeOfMealRepository()
    const typeOfMeal = new TypeOfMeal("1", "Café")
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek

    await typeOfMealRepository.create(typeOfMeal)

    const typeOfMealModel = await TypeOfMealModel.findOne({ where: { id: "1" } })

    expect(typeOfMealModel.toJSON()).toStrictEqual({
      id: "1",
      type: "Café",
      day: "Segunda-Feira"
    })
  })

  it("should update a type of meal", async () => {
    const typeOfMealRepository = new TypeOfMealRepository()
    const typeOfMeal = new TypeOfMeal("1", "Café")
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek

    await typeOfMealRepository.create(typeOfMeal)

    const typeOfMealModel = await TypeOfMealModel.findOne({ where: { id: "1" } })

    expect(typeOfMealModel.toJSON()).toStrictEqual({
      id: "1",
      type: "Café",
      day: "Segunda-Feira"
    })

    typeOfMeal.changeType("Almoço")

    await typeOfMealRepository.update(typeOfMeal)

    const typeOfMealModel2 = await TypeOfMealModel.findOne({ where: { id: "1" } })

    expect(typeOfMealModel2.toJSON()).toStrictEqual({
      id: "1",
      type: "Almoço",
      day: "Segunda-Feira"
    })
  })

  it("should delete a type of meal", async () => {
    const typeOfMealRepository = new TypeOfMealRepository()
    const typeOfMeal = new TypeOfMeal("1", "Café")
    const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
    typeOfMeal.DayOfTheWeek = dayOfTheWeek

    await typeOfMealRepository.create(typeOfMeal)

    const typeOfMealModel = await TypeOfMealModel.findOne({ where: { id: "1" } })

    expect(typeOfMealModel.toJSON()).toStrictEqual({
      id: "1",
      type: "Café",
      day: "Segunda-Feira"
    })

    
  })

})