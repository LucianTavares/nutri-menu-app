import User from "../../../../domain/user/entity/user";
import UserRepositoryInterface from "../../../../domain/user/repository/user-repository.interface";
import UserModel from "./user.model";

export default class UserRepository implements UserRepositoryInterface {

  async create(entity: User): Promise<void> {
    await UserModel.create({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      active: entity.isActive(),
    })
  }

  async update(entity: User): Promise<void> {
    await UserModel.update(
      {
        name: entity.name,
        email: entity.email,
        active: entity.isActive()
      },
      {
        where: {
          id: entity.id,
        }
      }
    )
  }

  async delete(id: string): Promise<void> {
    
    await UserModel.destroy(
      {
        where: {id: id}
      }
    )
  }
}