import { OrderItem } from "../../domain/entity/order_item";

describe("OrderItem unit test", () => {
  it("should throw error when id empty", () => {
    expect(() => {
      let orderItem = new OrderItem("", "orderItem1", 100, "productId", 100);
    }).toThrow("Id is required");
  });

  it("should throw error when name empty", () => {
    expect(() => {
      let orderItem = new OrderItem("1", "", 5, "p2", 100);
    }).toThrow("Name is required");
  });

  it("should throw error when price less than 0", () => {
    expect(() => {
      let orderItem = new OrderItem("1", "orderItem1", -100, "p3", 100);
    }).toThrow("Price must be greater than 0");
  });

  it("should throw error when productId empty", () => {
    expect(() => {
      let orderItem = new OrderItem("1", "orderItem1", 10, "", 100);
    }).toThrow("ProductId is required");
  });

  it("should throw error when qtn less than 0", () => {
    expect(() => {
      let orderItem = new OrderItem("1", "orderItem1", 5, "p4", -100);
    }).toThrow("Qtn must be greater than 0");
  });

  it("should return the total price of the order item", () => {
    const orderItem = new OrderItem("1", "orderItem1", 100, "productId", 100);
    expect(orderItem.getPrice()).toBe(10000);
  });

  it("should return the qtn of the order item", () => {
    const orderItem = new OrderItem("1", "orderItem1", 100, "productId", 100);
    expect(orderItem.getQtn()).toBe(100);
  });
});
