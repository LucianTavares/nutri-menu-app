// import { Sequelize } from "sequelize-typescript"
// import TypeOfMealRepository from "./typeOfMeal.repository";
// import TypeOfMealModel from "./typeOfMeal.model";
// import TypeOfMeal from "../../../../domain/type-of-meal/entity/typeOfMeal";
// import DayOfTheWeek from "../../../../domain/today-menu/entity/value-object/dayOfTheWeek";
// import TodayMenuModel from "../../../today-menu/repository/sequelize/todayMenu.model";
// import MixturesModel from "../../../mixture/repository/sequelize/mixtures.model";

// describe("Type of meal repository tests", () => {

//   let sequelize: Sequelize;

//   beforeEach(async () => {
//     sequelize = new Sequelize({
//       dialect: 'sqlite',
//       storage: ':memory:',
//       logging: false,
//       sync: { force: true }
//     })

//     sequelize.addModels([TypeOfMealModel, MixturesModel, TodayMenuModel]);
//     await sequelize.sync();

//   })

//   afterEach(async () => {
//     await sequelize.close()
//   })

//   it("should create a type of meal", async () => {
//     const typeOfMealRepository = new TypeOfMealRepository()
//     const typeOfMeal = new TypeOfMeal("1", "Café")
//     const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
//     typeOfMeal.DayOfTheWeek = dayOfTheWeek
//     typeOfMeal.activate()

//     await typeOfMealRepository.create(typeOfMeal)

//     const typeOfMealModel = await TypeOfMealModel.findOne(
//       {
//         where: { id: "1" }
//       },

//     )

//     expect(typeOfMealModel.toJSON()).toStrictEqual({
//       id: "1",
//       type: "Café",
//       day: "Segunda-Feira",
//       active: true
//     })
//   })

//   it("should update a type of meal", async () => {
//     const typeOfMealRepository = new TypeOfMealRepository()
//     const typeOfMeal = new TypeOfMeal("1", "Café")
//     const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
//     typeOfMeal.DayOfTheWeek = dayOfTheWeek
//     typeOfMeal.activate()

//     await typeOfMealRepository.create(typeOfMeal)

//     const typeOfMealModel = await TypeOfMealModel.findOne({ where: { id: "1" } })

//     expect(typeOfMealModel.toJSON()).toStrictEqual({
//       id: "1",
//       type: "Café",
//       day: "Segunda-Feira",
//       active: true
//     })

//     typeOfMeal.changeType("Almoço")

//     await typeOfMealRepository.update(typeOfMeal)

//     const typeOfMealModel2 = await TypeOfMealModel.findOne({ where: { id: "1" } })

//     expect(typeOfMealModel2.toJSON()).toStrictEqual({
//       id: "1",
//       type: "Almoço",
//       day: "Segunda-Feira",
//       active: true
//     })
//   })

//   it("should delete a type of meal", async () => {
//     const typeOfMealRepository = new TypeOfMealRepository()
//     const typeOfMeal = new TypeOfMeal("1", "Café")
//     const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
//     typeOfMeal.DayOfTheWeek = dayOfTheWeek

//     await typeOfMealRepository.create(typeOfMeal)

//     const typeOfMealModel = await TypeOfMealModel.findOne({ where: { id: "1" } })

//     expect(typeOfMealModel.toJSON()).toStrictEqual({
//       id: "1",
//       type: "Café",
//       day: "Segunda-Feira",
//       active: false
//     })

//     const result = await typeOfMealRepository.delete(typeOfMeal.id)

//     expect(result).toBeUndefined()
//   })

//   it("should find a type of meal", async () => {
//     const typeOfMealRepository = new TypeOfMealRepository()
//     const typeOfMeal = new TypeOfMeal("1", "Café")
//     const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
//     typeOfMeal.DayOfTheWeek = dayOfTheWeek
//     typeOfMeal.activate()

//     await typeOfMealRepository.create(typeOfMeal)

//     const typeOfMealModel = await TypeOfMealModel.findOne({ where: { id: "1" } })
//     const foundTypeOfMeal = await typeOfMealRepository.find("1")

//     expect(typeOfMealModel.toJSON()).toStrictEqual({
//       id: foundTypeOfMeal.id,
//       type: foundTypeOfMeal.type,
//       day: typeOfMeal.DayOfTheWeek.day,
//       active: typeOfMeal.isActive()
//     })
//   })

//   it("should find a type of meal by type", async () => {
//     const typeOfMealRepository = new TypeOfMealRepository()
//     const typeOfMeal = new TypeOfMeal("1", "Café")
//     const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
//     typeOfMeal.DayOfTheWeek = dayOfTheWeek
//     typeOfMeal.activate()

//     await typeOfMealRepository.create(typeOfMeal)

//     const typeOfMealModel = await TypeOfMealModel.findOne({ where: { type: "Café" } })
//     const foundTypeOfMeal = await typeOfMealRepository.findByType("Café")

//     expect(typeOfMealModel.toJSON()).toStrictEqual({
//       id: foundTypeOfMeal.id,
//       type: foundTypeOfMeal.type,
//       day: typeOfMeal.DayOfTheWeek.day,
//       active: typeOfMeal.isActive()
//     })
//   })

//   it("should find all types of meal", async () => {
//     const typeOfMealRepository = new TypeOfMealRepository()
//     const typeOfMeal = new TypeOfMeal("1", "Café")
//     const dayOfTheWeek = new DayOfTheWeek("Segunda-Feira")
//     typeOfMeal.DayOfTheWeek = dayOfTheWeek
//     typeOfMeal.activate()

//     await typeOfMealRepository.create(typeOfMeal)

//     const typeOfMeal2 = new TypeOfMeal("2", "Almoço")
//     const dayOfTheWeek2 = new DayOfTheWeek("Quarta-Feira")
//     typeOfMeal2.DayOfTheWeek = dayOfTheWeek2
//     typeOfMeal2.activate()

//     await typeOfMealRepository.create(typeOfMeal2)

//     const foundTypesOfMeal = await typeOfMealRepository.findAll()

//     expect(foundTypesOfMeal).toHaveLength(2)
//     expect(foundTypesOfMeal).toContainEqual(typeOfMeal)
//     expect(foundTypesOfMeal).toContainEqual(typeOfMeal2)

//   })

// })