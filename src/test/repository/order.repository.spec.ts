import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../infra/repository/customer/sequelize/customer.model";
import { OrderModel } from "../../infra/order/repository/sequelize/order.model";
import { OrderItemModel } from "../../infra/order/repository/sequelize/order_item.model";
import { ProductModel } from "../../infra/repository/product/sequelize/product.model";

import { Address } from "../../domain/customer/value-object/address";
import { ProductRepository } from "../../infra/repository/product/sequelize/product.repository";
import { Product } from "../../domain/product/entity/product";
import { OrderItem } from "../../domain/checkout/entity/order_item";
import { Order } from "../../domain/checkout/entity/order";
import { OrderRepository } from "../../infra/order/repository/sequelize/order.repository";
import { Customer } from "../../domain/customer/entity/customer";
import { CustomerRepository } from "../../infra/repository/customer/sequelize/customer.repository";

describe("OrderRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      CustomerModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an order", async () => {
    //create a customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address("rua 1", "cidade 1", "estado 1", "6000325", 20);
    customer.changeAddress(address);
    await customerRepository.create(customer);

    //create a product
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);
    await productRepository.create(product);

    //create an order-item
    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    //create an order
    const orderRepository = new OrderRepository();
    const order = new Order("1", customer.getId(), [ordemItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "123",
      total: order.totalOrder(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.getPrice(),
          quantity: ordemItem.getQtn(),
          order_id: "1",
          product_id: product.id,
        },
      ],
    });
  });
});
