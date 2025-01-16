import { Order } from "sequelize";
import { ICustomerRepository } from "../../../../domain/customer/repository/customer_repository";
import { Customer } from "../../../../domain/customer/entity/customer";
import { CustomerModel } from "./customer.model";
import {
  IMetadata,
  IQueryParams,
} from "../../../../domain/@Shared/repository/repository_interface";
import { Address } from "../../../../domain/customer/value-object/address";

export class CustomerRepository implements ICustomerRepository {
  async update(entity: Customer): Promise<void> {
    const address = entity.getAddressOrNull();

    await CustomerModel.update(
      {
        name: entity.getName(),
        ...address,
        active: entity.isActive(),
        rewardPoints: entity.getRewardPoints(),
      },
      {
        where: { id: entity.getId() },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;

    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerModel.id, customerModel.name);

    const address = new Address(
      customerModel.street,
      customerModel.city,
      customerModel.state,
      customerModel.zipCode,
      customerModel.number
    );

    customer.changeAddress(address);

    if (customerModel.active) {
      customer.activate();
    }

    return customer;
  }

  async delete(id: string): Promise<void> {
    await CustomerModel.destroy({
      where: { id },
    });
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModel) => {
      let customer = new Customer(customerModel.id, customerModel.name);
      customer.addRewardPoints(customerModel.rewardPoints);
      const address = new Address(
        customerModel.street,
        customerModel.city,
        customerModel.state,
        customerModel.zipCode,
        customerModel.number
      );
      customer.changeAddress(address);

      if (customerModel.active) {
        customer.activate();
      }

      return customer;
    });

    return customers;
  }

  async paginated(params: IQueryParams): Promise<IMetadata<Customer>> {
    const { page = 1, limit = 10, filters, sort } = params;

    const order: Order = sort
      ? (Object.entries(sort).map(([key, value]) => [key, value]) as Order)
      : [];

    const { count, rows } = await CustomerModel.findAndCountAll({
      limit: limit,
      where: filters,
      order: order,
    });

    const customers = rows.map((customerModel) => {
      let customer = new Customer(customerModel.id, customerModel.name);
      customer.addRewardPoints(customerModel.rewardPoints);
      const address = new Address(
        customerModel.street,
        customerModel.city,
        customerModel.state,
        customerModel.zipCode,
        customerModel.number
      );
      customer.changeAddress(address);

      if (customerModel.active) {
        customer.activate();
      }

      return customer;
    });

    return {
      data: customers,
      total: count,
      page: page,
      limit: limit,
    };
  }

  async create(entity: Customer): Promise<void> {
    const address = entity.getAddressOrNull();

    await CustomerModel.create({
      id: entity.getId(),
      name: entity.getName(),
      ...address,
      active: entity.isActive(),
      rewardPoints: entity.getRewardPoints(),
    });
  }
}
