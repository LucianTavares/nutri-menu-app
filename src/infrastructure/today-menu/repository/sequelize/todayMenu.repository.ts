import Mixtures from "../../../../domain/mixture/entity/mixtures";
import TodayMenu from "../../../../domain/today-menu/entity/todayMenu";
import TodayMenuRepositoryInterface from "../../../../domain/today-menu/repository/todayMenu-repository.interface";
import TodayMenuModel from "./todayMenu.model";
import MixturesModel from "../../../mixture/repository/sequelize/mixtures.model";
import TypeOfMealModel from "../../../type-of-meal/repository/sequelize/typeOfMeal.model";
import TypeOfMeal from "../../../../domain/type-of-meal/entity/typeOfMeal";


export default class TodayMenuRepository implements TodayMenuRepositoryInterface {

  async create(entity: TodayMenu): Promise<void> {
    await TodayMenuModel.create(
      {
        id: entity.id,
        mixtures: entity.mixtures.map((m) => ({
          id: m.id,
          mixture: m.mixture,
          can_freeze: m.isFreeze(),
          active: m.isActive(),
          today_menu_id: entity.id,
        })),
        type_of_meal: entity.typeOfMeal.map((type) => ({
          id: type.id,
          type: type.type,
          day: type.DayOfTheWeek.day,
          active: type.isActive(),
          today_menu_id: entity.id
        })),
        its_frozen: entity.isFrozen(),
        active: entity.isActive(),
      },
      {
        include: [{ model: MixturesModel }, { model: TypeOfMealModel }]
      }
    )
  }

  async update(entity: TodayMenu): Promise<void> {
    try {
      const sequelize = TodayMenuModel.sequelize
      await sequelize.transaction(async (t) => {

        await MixturesModel.destroy({
          where: { id: entity.mixtures.map(m => m.id).join() },
          transaction: t
        })
        const mixtures = entity.mixtures.map((m) => ({
          id: m.id,
          mixture: m.mixture,
          can_freeze: m.isFreeze(),
          active: m.isActive(),
          today_menu_id: entity.id
        }))

        await TypeOfMealModel.destroy({
          where: { id: entity.typeOfMeal.map(m => m.id).join() },
          transaction: t
        })
        const typeOfMeal = entity.typeOfMeal.map((type) => ({
          id: type.id,
          type: type.type,
          day: type.DayOfTheWeek.day,
          active: type.isActive(),
          today_menu_id: entity.id
        }))

        await MixturesModel.bulkCreate(mixtures, { transaction: t })
        await TypeOfMealModel.bulkCreate(typeOfMeal, { transaction: t })

        await TodayMenuModel.update(
          {
            its_frozen: entity.isFrozen(),
            active: entity.isActive()
          },
          { where: { id: entity.id }, transaction: t }
        )
      })
    } catch (err) {
      console.error(err)
    }
  }

  async delete(id: string): Promise<void> {
    await TodayMenuModel.destroy(
      {
        where: { id: id },
      }
    )
  }

  async find(id: string): Promise<TodayMenu> {
    const todayMenu = await TodayMenuModel.findOne(
      {
        where: { id },
        include: [{ model: MixturesModel }, { model: TypeOfMealModel }]
      },
    )

    return new TodayMenu({
      id: todayMenu.id,
      itsFrozen: todayMenu.its_frozen,
      active: todayMenu.active,
      mixtures: todayMenu.mixtures.map(mixture => new Mixtures(
        mixture.id,
        mixture.mixture
      )),
      typeOfMeal: todayMenu.type_of_meal.map(type => new TypeOfMeal(
        type.id,
        type.type
      ))
    })

  }

  async findAll(): Promise<TodayMenu[]> {
    throw new Error("Method not implemented.");
  }

}