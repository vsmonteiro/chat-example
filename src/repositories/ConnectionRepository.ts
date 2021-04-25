import { EntityRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";

@EntityRepository(Connection)
export default class ConnectionRepository extends Repository<Connection> {}