import User from "../entity/user";
import UserInterface from "../entity/user.interface";
import {v4 as uuid} from 'uuid'

export default class UserFactory {

  public static create(name: string, email: string): UserInterface {
    return new User({id: uuid(), name: name, email: email})
  }
}