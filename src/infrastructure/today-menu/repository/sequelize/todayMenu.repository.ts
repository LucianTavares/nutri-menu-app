import TodayMenu from "../../../../domain/today-menu/entity/todayMenu";
import TodayMenuRepositoryInterface from "../../../../domain/today-menu/repository/todayMenu-repository.interface";
import TodayMenuModel from "./todayMenu.model";


export default class TodayMenuRepository implements TodayMenuRepositoryInterface {

  async create(entity: TodayMenu): Promise<void> {
    await TodayMenuModel.create(
      {
        id: entity.id,
        mixtures: entity.mixtures.map((m) => ({
          id: m.id,
          mixture: m.mixture,
          can_freeze: m.isFreeze(),
          active: m.isActive()
        })),
        type_of_meal_id: entity.typeOfMealId,
        its_frozen: entity.isFrozen(),
        active: entity.isActive(),
      },
      {
        include: ["mixtures", "type_of_meal"]
      }
    )
  }

  async update(entity: TodayMenu): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async find(id: string): Promise<TodayMenu> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<TodayMenu[]> {
    throw new Error("Method not implemented.");
  }

}