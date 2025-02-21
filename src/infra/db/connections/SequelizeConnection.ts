import { Sequelize, Dialect } from "sequelize";
import { IDatabaseConfig, IDatabaseConnection } from "../db.interface";
// import {ProductModel} from "../../repository/product/sequelize/product.model";
// import {CustomerModel} from "../../repository/customer/sequelize/customer.model";
// import {OrderModel} from "../../repository/order/sequelize/order.model";
// import {OrderItemModel} from "../../repository/order/sequelize/order_item.model";

export class SequelizeConnection implements IDatabaseConnection {
  private connection: Sequelize;

  constructor(private config: IDatabaseConfig) {
    this.connection = new Sequelize({
      database: config.database,
      username: config.username,
      password: config.password,
      host: config.host,
      port: config.port,
      dialect: (config.dialect as Dialect) || "mysql",
      logging: false,
    });

    // Handling connection loss
    this.connection.addHook("afterDisconnect", async () => {
      console.log("Database connection lost. Attempting to reconnect...");
      await this.connect(); // Reconnect logic
    });
  }

  public async connect(): Promise<void> {
    try {
      await this.connection.authenticate();
      console.log("Sequelize connection established successfully");
    } catch (error) {
      console.error("Unable to connect to Sequelize:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.connection.close();
      console.log("Sequelize connection closed successfully");
    } catch (error) {
      console.error("Error closing Sequelize connection:", error);
      throw error;
    }
  }

  public getInstance(): Sequelize {
    return this.connection;
  }
}
