import { IDatabaseConfig } from "./db.interface";

const dbConfig: IDatabaseConfig = {
  database: process.env.DB_NAME || "database_name",
  username: process.env.DB_USER || "username",
  password: process.env.DB_PASS || "password",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  dialect: process.env.DB_DIALECT || "mysql",
};

export default dbConfig;
