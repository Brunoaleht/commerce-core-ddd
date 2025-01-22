import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../infra/repository/customer/sequelize/customer.model";

import { Address } from "../../domain/customer/value-object/address";
import { Customer } from "../../domain/customer/entity/customer";
import { CustomerRepository } from "../../infra/repository/customer/sequelize/customer.repository";

describe("CustomerRepository test", () => {
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

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "1" },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 1",
      street: null,
      number: null,
      zipCode: null,
      city: null,
      state: null,
      active: false,
      rewardPoints: 0,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");

    await customerRepository.create(customer);

    let customerModel = await CustomerModel.findOne({
      where: { id: "1" },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 1",
      street: null,
      number: null,
      zipCode: null,
      city: null,
      state: null,
      active: false,
      rewardPoints: 0,
    });

    customer.changeName("Customer 2");
    customer.changeAddress(
      new Address("Street 1", "City 1", "State 1", "123456", 20)
    );
    customer.activate();
    customer.addRewardPoints(100);

    await customerRepository.update(customer);

    customerModel = await CustomerModel.findOne({
      where: { id: "1" },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 2",
      street: "Street 1",
      number: 20,
      zipCode: "123456",
      city: "City 1",
      state: "State 1",
      active: true,
      rewardPoints: 100,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", "City 1", "State 1", "123456", 20);
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "1" },
    });

    const customerFound = await customerRepository.find("1");

    expect(customerModel.toJSON()).toStrictEqual({
      id: customerFound?.getId(),
      name: customerFound?.getName(),
      street: customerFound?.getAddress().street,
      number: customerFound?.getAddress().number,
      zipCode: customerFound?.getAddress().zipCode,
      city: customerFound?.getAddress().city,
      state: customerFound?.getAddress().state,
      active: customerFound?.isActive(),
      rewardPoints: customerFound?.getRewardPoints(),
    });
  });
});
