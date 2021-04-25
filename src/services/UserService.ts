import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = getCustomRepository(UserRepository);
  }

  async create(email: string) {
    const userExists = await this.userRepo.findOne({
      email,
    });

    if (userExists) {
      return userExists;
    }

    const user = this.userRepo.create({
      email,
    });

    await this.userRepo.save(user);
    return user;
  }
}
