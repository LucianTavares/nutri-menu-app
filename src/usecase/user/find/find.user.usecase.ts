import UserRepositoryInterface from "../../../domain/user/repository/user-repository.interface";
import { InputFindUserDto, OutputFindUserDto } from "./find.user.usecase.dto";

export default class FindUserUseCase {

  private userRepository: UserRepositoryInterface

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository
  }

  async execute(input: InputFindUserDto): Promise<OutputFindUserDto> {

    const user = await this.userRepository.find(input.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }
}