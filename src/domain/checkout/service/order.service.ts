import { Customer } from "../../customer/entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";
import { v4 as uuid } from "uuid";

export class OrderService {
  static getAllTotal(orders: Order[]): number {
    const total = orders.reduce((acc, order) => {
      return acc + order.totalOrder();
    }, 0);

    return total;
  }

  static getMediamTotal(orders: Order[]): number {
    const total = orders.reduce((acc, order) => {
      return acc + order.totalOrder();
    }, 0);

    if (orders.length > 0) {
      return total / orders.length;
    }

    return 0;
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    const order = new Order(uuid(), customer.getId(), items);
    const rewardPoints = order.totalOrder() / 2;
    customer.addRewardPoints(rewardPoints);

    return order;
  }
}
