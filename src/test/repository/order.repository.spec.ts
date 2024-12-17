import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../infra/db/sequelize/model/customer.model";
import { CustomerRepository } from "../../infra/repository/cutomer.repository";
import { Customer } from "../../domain/entity/customer";
import { Address } from "../../domain/entity/address";

describe("OrderRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
});
