import dbConfig from "../config";
import { SequelizeConnection } from "./SequelizeConnection";

export const sequelizeConnection = new SequelizeConnection(dbConfig);
