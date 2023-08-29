import User from "../../../domain/user/entity/user";
import UserRepositoryInterface from "../../../domain/user/repository/user-repository.interface";
import { InputCreateUserDto, OutputCreateUserDto } from "./create.user.dto";
import { v4 as uuid } from 'uuid'

export default class CreateUserUseCase {

  private userRepository: UserRepositoryInterface

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository
  }

  async execute(input: InputCreateUserDto): Promise<OutputCreateUserDto> {

    const userId = uuid()

    const props = {
      id: userId,
      name: input.name,
      email: input.email
    }

    const user = new User({id: props.id, name: props.name, email: props.email})

    await this.userRepository.create(user)

    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}