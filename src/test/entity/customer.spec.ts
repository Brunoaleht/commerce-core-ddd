import { Customer } from "../../domain/customer/entity/customer";
import { Address } from "../../domain/customer/value-object/address";

describe("Customer unit test", () => {
  it("should throw error when id empty", () => {
    expect(() => {
      let customer = new Customer("", "name");
    }).toThrow("Id is required");
  });

  it("should throw error when name empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrow("Name is required");
  });

  it("should get customer Id", () => {
    const customer = new Customer("123", "name");
    expect(customer.getId()).toBe("123");
  });

  it("should change name", () => {
    //arrange
    const customer = new Customer("123", "name");

    //action
    customer.changeName("Test");

    //assert
    expect(customer.getName()).toBe("Test");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "customer 1");
    const address = new Address("street", "city", "state", "zip", 20);
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "customer 1");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should throw error, is on activate customer without address", () => {
    expect(() => {
      const customer = new Customer("123", "customer 2");
      customer.activate();
    }).toThrow("Address mandatory to activate customer");
  });

  it("should get customer address", () => {
    const customer = new Customer("123", "customer 1");
    const address = new Address("street", "city", "state", "zip", 20);
    customer.Address = address;

    expect(customer.getAddress()).toBe(address);
  });

  it("should add reward points", () => {
    const customer = new Customer("123", "customer 1");
    expect(customer.getRewardPoints()).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.getRewardPoints()).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.getRewardPoints()).toBe(20);
  });
});
