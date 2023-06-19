import User from "../../../../domain/user/entity/user";
import UserRepositoryInterface from "../../../../domain/user/repository/user-repository.interface";
import UserModel from "./user.model";

export default class UserRepository implements UserRepositoryInterface {

  async create(entity: User): Promise<void> {
    try {
      await UserModel.create({
        id: entity.id,
        name: entity.name,
        email: entity.email,
        active: entity.isActive(),
      })
    } catch (e) {
      console.log(e);
    }
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
        where: { id: id }
      }
    )
  }

  async find(id: string): Promise<User> {
    let userModel
    try {
      userModel = await UserModel.findOne({
        where: {
          id: id
        },
        rejectOnEmpty: true
      })
    } catch (err) {
      throw new Error("User not found")
    }

    const user = new User(
      userModel.id,
      userModel.name,
      userModel.email
    )

    return user
  }
}