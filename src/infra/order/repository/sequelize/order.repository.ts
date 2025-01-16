import { Address } from "../../../../domain/customer/value-object/address";

import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import { IOrderRepository } from "../../../../domain/checkout/repository/order_repository.interface";
import {
  IMetadata,
  IQueryParams,
} from "../../../../domain/@Shared/repository/repository_interface";
import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { OrderModel } from "./order.model";
import { OrderItemModel } from "./order_item.model";
import { Customer } from "../../../../domain/customer/entity/customer";

export class OrderRepository implements IOrderRepository {
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.totalOrder(),
        items: entity.getItems().map((item) => ({
          id: item.id,
          product_id: item.getProductId(),
          order_id: entity.id,
          quantity: item.getQtn(),
          name: item.name,
          price: item.getPrice(),
        })),
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderItemModel }],
    });

    if (!orderModel) {
      throw new Error("Order not found");
    }

    const customerModel = await CustomerModel.findOne({
      where: { id: orderModel.customer_id },
    });

    if (!customerModel) {
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

    const items = orderModel.items.map(
      (item: any) =>
        new OrderItem(
          item.id,
          item.product_id,
          item.name,
          item.price,
          item.quantity
        )
    );
    const order = new Order(orderModel.id, customer.getId(), items);

    return order;
  }

  async delete(id: string): Promise<void> {
    await OrderModel.destroy({
      where: { id },
    });
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    const orders = orderModels.map((orderModel) => {
      const customerModel = orderModel.customer;
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.city,
        customerModel.state,
        customerModel.zipCode,
        customerModel.number
      );
      customer.changeAddress(address);

      const items = orderModel.items.map(
        (item: any) =>
          new OrderItem(
            item.id,
            item.product_id,
            item.name,
            item.price,
            item.quantity
          )
      );

      const order = new Order(orderModel.id, customer.getId(), items);

      return order;
    });

    return orders;
  }

  async paginated(params: IQueryParams): Promise<IMetadata<Order>> {
    const { count, rows } = await OrderModel.findAndCountAll({
      limit: params.limit,
      offset: params.page,
      include: [{ model: OrderItemModel }],
    });

    const orders = rows.map((orderModel) => {
      const customerModel = orderModel.customer;
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.city,
        customerModel.state,
        customerModel.zipCode,
        customerModel.number
      );
      customer.changeAddress(address);

      const items = orderModel.items.map(
        (item: any) =>
          new OrderItem(
            item.id,
            item.product_id,
            item.name,
            item.price,
            item.quantity
          )
      );

      const order = new Order(orderModel.id, customer.getId(), items);

      return order;
    });

    return {
      page: params.page,
      limit: params.limit,
      total: count,
      data: orders,
    };
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.totalOrder(),
        items: entity.getItems().map((item) => ({
          id: item.id,
          product_id: item.getProductId(),
          order_id: entity.id,
          quantity: item.getQtn(),
          name: item.name,
          price: item.getPrice(),
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
