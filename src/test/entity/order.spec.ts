import { Order } from "../../domain/checkout/entity/order";
import { OrderItem } from "../../domain/checkout/entity/order_item";

describe("Order unit test", () => {
  it("should throw error when !items.length array empty", () => {
    expect(() => {
      let order = new Order("1", "123", []);
    }).toThrow("Items is required");
  });

  it("should throw error when Id empty", () => {
    expect(() => {
      let item = new OrderItem("1", "item 1", 10, "p1", 1);
      let order = new Order("", "123", [item]);
    }).toThrow("Id is required");
  });

  it("should throw error when customerId empty", () => {
    expect(() => {
      let item = new OrderItem("1", "item 1", 10, "p1", 1);
      let order = new Order("1", "", [item]);
    }).toThrow("CustomerId is required");
  });

  it("should get total value order", () => {
    let items1 = new OrderItem("1", "item 1", 10, "p1", 1);
    let items2 = new OrderItem("2", "item 2", 20, "p2", 2);

    const order = new Order("1", "123", [items1, items2]);
    expect(order.totalOrder()).toBe(50);
  });

  it("should change items", () => {
    let items1 = new OrderItem("1", "item 1", 10, "p1", 1);
    const order = new Order("1", "123", [items1]);
    let items3 = new OrderItem("3", "item 3", 30, "p3", 1);
    order.changeItems([items3]);
    expect(order.totalOrder()).toBe(30);
  });

  it("should throw error if when item qtn is less than 0 ", () => {
    expect(() => {
      const item = new OrderItem("1", "item 1", 10, "p1", -1);
      let order = new Order("1", "123", [item]);
    }).toThrow("Qtn must be greater than 0");
  });

  it("should throw error if when item price is less than 0 ", () => {
    expect(() => {
      const item = new OrderItem("1", "item 1", -10, "p1", 1);
      let order = new Order("1", "123", [item]);
    }).toThrow("Price must be greater than 0");
  });
});
