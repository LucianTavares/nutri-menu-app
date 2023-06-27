import UserRepositoryInterface from "../../../domain/user/repository/user-repository.interface";
import { InputUpdateUserDto, OutputUpdateUserDto } from "./update.user.dto";

export default class UpdateUserUseCase {
  
  private userRepository: UserRepositoryInterface

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository
  }

  async execute(input: InputUpdateUserDto): Promise<OutputUpdateUserDto> {
    const user = await this.userRepository.find(input.id)

    user.changeName(input.name)
    user.changeEmail(input.email)

    await  this.userRepository.update(user)

    return {
      id: input.id,
      name: input.name,
      email: input.email
    }
  }
}