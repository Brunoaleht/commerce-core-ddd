import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { Order } from "../../domain/entity/order";
import { ICustomerRepository } from "../../domain/repository/customer_repository";
import {
  IQueryParams,
  IMetadata,
} from "../../domain/repository/repository_interface";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { OrderModel } from "../db/sequelize/model/order.model";
import { OrderItemModel } from "../db/sequelize/model/order_item.model";

export class OrderRepository {
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
