import { OrderItem } from "../../domain/checkout/entity/order_item";
import { OrderService } from "../../domain/checkout/service/order.service";
import { Order } from "../../domain/checkout/entity/order";
import { Customer } from "../../domain/customer/entity/customer";

describe("OrderService unit test", () => {
  it("should place an order", () => {
    const customer = new Customer("1", "customer 1");
    const item = new OrderItem("1", "item 1", 100, "p1", 1);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.getRewardPoints()).toBe(50);
    expect(order.totalOrder()).toBe(100);
  });

  it("should get total all orders", () => {
    const item1 = new OrderItem("1", "item 1", 100, "p1", 1);
    const item2 = new OrderItem("2", "item 2", 200, "p2", 2);

    const order1 = new Order("o1", "c1", [item1]);
    const order2 = new Order("o2", "c2", [item2]);

    const orders = [order1, order2];

    const total = OrderService.getAllTotal(orders);

    expect(total).toBe(500);
  });

  it("should get value mediam of all orders", () => {
    const item1 = new OrderItem("1", "item 1", 100, "p1", 1);
    const item2 = new OrderItem("2", "item 2", 200, "p2", 2);

    const order1 = new Order("o1", "c1", [item1]);
    const order2 = new Order("o2", "c2", [item2]);

    const orders = [order1, order2];

    const median = OrderService.getMediamTotal(orders);

    expect(median).toBe(250);
  });

  it("should return 0 when orders is empty", () => {
    const orders: Order[] = [];

    const median = OrderService.getMediamTotal(orders);

    expect(median).toBe(0);
  });
});
