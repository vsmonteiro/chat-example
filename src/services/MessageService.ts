import { getCustomRepository } from "typeorm";
import { MessageRepository } from "../repositories/MessageRepository";

interface IMessageCreate {
  text: string;
  admin_id?: string;
  user_id: string;
}

export class MessageService {
  private messageRepo: MessageRepository;

  constructor() {
    this.messageRepo = getCustomRepository(MessageRepository)
  }

  async create({ text, admin_id, user_id }: IMessageCreate) {
    const message = this.messageRepo.create({
      text,
      admin_id,
      user_id,
    });

    await this.messageRepo.save(message);
    return message;
  }

  async listByUser(user_id: string) {
    return await this.messageRepo.find({
      where: { user_id },
      relations: ['user']
    })
  }
}
