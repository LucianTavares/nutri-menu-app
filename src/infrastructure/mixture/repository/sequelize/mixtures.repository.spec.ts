// import { Sequelize } from "sequelize-typescript"
// import MixturesRepository from "./mixture.repository"
// import MixturesModel from "./mixtures.model"
// import Mixtures from "../../../../domain/mixture/entity/mixtures"
// import TodayMenuModel from "../../../today-menu/repository/sequelize/todayMenu.model"
// import TypeOfMealModel from "../../../type-of-meal/repository/sequelize/typeOfMeal.model"
// import TodayMenu from "../../../../domain/today-menu/entity/todayMenu"
// import TypeOfMeal from "../../../../domain/type-of-meal/entity/typeOfMeal"

// const mockTodayMenuRepository = () => {
//   return {
//     find: jest.fn(),
//     create: jest.fn(),
//   }
// }

// const mockTypeOfMealRepository = () => {
//   return {
//     find: jest.fn(),
//     create: jest.fn(),
//   }
// }

// describe("Mixtures repository tests", () => {

//   let sequelize: Sequelize

//   beforeEach(async () => {
//     sequelize = new Sequelize({
//       dialect: 'sqlite',
//       storage: ":memory:",
//       logging: false,
//       sync: { force: true }
//     })

//     sequelize.addModels([MixturesModel, TypeOfMealModel, TodayMenuModel])
//     await sequelize.sync()
//   })

//   afterEach(async () => {
//     await sequelize.close()
//   })

//   it("should create a mixture", async () => {
//     const mixturesRepository = new MixturesRepository()
//     const mixture = new Mixtures("1", "Pão")
//     mixture.cannotFreeze()
//     mixture.activate()

//     const typeOfMeal = new TypeOfMeal("1", "Café")

//     const todayMenu = new TodayMenu("1", [mixture], [typeOfMeal])

//     await mixturesRepository.create(mixture)

//     const mixtureModel = await MixturesModel.findOne({
//       where: { id: "1" }
//     })

//     expect(mixtureModel.toJSON()).toStrictEqual({
//       id: "1",
//       mixture: "Pão",
//       can_freeze: false,
//       active: true,
//       today_menu_id: "1"
//     })
//   })

//   it("should update a mixture", async () => {
//     const mixturesRepository = new MixturesRepository()
//     const mixture = new Mixtures("1", "Pão")
//     mixture.cannotFreeze()
//     mixture.activate()

//     await mixturesRepository.create(mixture)

//     const mixtureModel = await MixturesModel.findOne({
//       where: { id: "1" }
//     })

//     expect(mixtureModel.toJSON()).toStrictEqual({
//       id: "1",
//       mixture: "Pão",
//       can_freeze: false,
//       active: true,
//     })

//     mixture.changeMixture("Tapioca")

//     await mixturesRepository.update(mixture)

//     const mixtureModel2 = await MixturesModel.findOne({
//       where: { id: "1" }
//     })

//     expect(mixtureModel2.toJSON()).toStrictEqual({
//       id: "1",
//       mixture: "Tapioca",
//       can_freeze: false,
//       active: true
//     })
//   })

//   it("should delete a mixture", async () => {
//     const mixturesRepository = new MixturesRepository()
//     const mixture = new Mixtures("1", "Pão")
//     mixture.cannotFreeze()
//     mixture.activate()

//     await mixturesRepository.create(mixture)

//     const mixtureModel = await MixturesModel.findOne({
//       where: { id: "1" }
//     })

//     expect(mixtureModel.toJSON()).toStrictEqual({
//       id: "1",
//       mixture: "Pão",
//       can_freeze: false,
//       active: true
//     })

//     const result = await mixturesRepository.delete(mixture.id)

//     expect(result).toBeUndefined()
//   })

//   it("should find a mixture", async () => {
//     const mixturesRepository = new MixturesRepository()
//     const mixture = new Mixtures("1", "Pão")
//     mixture.cannotFreeze()
//     mixture.activate()

//     await mixturesRepository.create(mixture)

//     const mixtureModel = await MixturesModel.findOne({
//       where: { id: "1" }
//     })

//     const foundMixture = await mixturesRepository.find("1")

//     expect(mixtureModel.toJSON()).toStrictEqual({
//       id: foundMixture.id,
//       mixture: foundMixture.mixture,
//       can_freeze: mixture.isFreeze(),
//       active: mixture.isActive()
//     })
//   })

//   it("should find mixture by mixture", async () => {
//     const mixturesRepository = new MixturesRepository()
//     const mixture = new Mixtures("1", "Pão")
//     mixture.cannotFreeze()
//     mixture.activate()

//     await mixturesRepository.create(mixture)

//     const mixtureModel = await MixturesModel.findOne({
//       where: { id: "1" }
//     })

//     const foundMixture = await mixturesRepository.findByMixture("Pão")

//     expect(mixtureModel.toJSON()).toStrictEqual({
//       id: foundMixture.id,
//       mixture: foundMixture.mixture,
//       can_freeze: mixture.isFreeze(),
//       active: mixture.isActive()
//     })
//   })

//   it("should find all mixtures", async () => {
//     const mixturesRepository = new MixturesRepository()

//     const mixture = new Mixtures("1", "Pão")
//     mixture.cannotFreeze()
//     mixture.activate()

//     await mixturesRepository.create(mixture)

//     const mixture2 = new Mixtures("2", "Tapioca")
//     mixture.cannotFreeze()
//     mixture.activate()

//     await mixturesRepository.create(mixture2)

//     const foundMixtures = await mixturesRepository.findAll()

//     expect(foundMixtures).toHaveLength(2)
//     expect(foundMixtures).toContainEqual(mixture)
//     expect(foundMixtures).toContainEqual(mixture2)
//   })
// })