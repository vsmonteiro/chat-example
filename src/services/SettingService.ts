import { getCustomRepository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingRepository } from "../repositories/SettingRepository";

interface ISettingCreate {
  chat: boolean;
  username: string;
}

export class SettingService {
  private settingsRepo: SettingRepository;

  constructor() {
    this.settingsRepo = getCustomRepository(SettingRepository);
  }

  async create({ chat, username }: ISettingCreate) {
    const userExists = await this.settingsRepo.findOne({
      username,
    });

    if (userExists) {
      throw new Error("user alredy exists!");
    }

    const settings = this.settingsRepo.create({
      chat,
      username,
    });

    await this.settingsRepo.save(settings);

    return settings;
  }

  async findByUsername(username: string) {
    return await this.settingsRepo.findOne({
      username,
    });
  }

  async update(username: string, chat: boolean) {
   return await this.settingsRepo
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("username = :username", {
        username,
      })
      .execute();
  }
}
