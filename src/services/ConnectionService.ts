import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import ConnectionRepository from "../repositories/ConnectionRepository";

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

export class ConnectionService {
  private connectionRepo: ConnectionRepository;

  constructor() {
    this.connectionRepo = getCustomRepository(ConnectionRepository);
  }

  async create({ admin_id, id, user_id, socket_id }: IConnectionCreate) {
    const connection = this.connectionRepo.create({
      admin_id,
      id,
      user_id,
      socket_id,
    });

    await this.connectionRepo.save(connection);

    return connection;
  }

  async findByUser(user_id: string) {
    return await this.connectionRepo.findOne({
      user_id,
    });
  }

  async findAllWithoutAdmin() {
    return await this.connectionRepo.find({
      where: { admin_id: null },
      relations: ["user"],
    });
  }

  async findBySocket(socket_id: string) {
    return await this.connectionRepo.findOne({
      socket_id,
    });
  }

  async updateAdmin(user_id: string, admin_id: string) {
    await this.connectionRepo
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where("user_id = :user_id", {
        user_id,
      })
      .execute();
  }
}
