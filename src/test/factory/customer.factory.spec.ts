import CustomerFactory from "../../domain/customer/factory/customer.factory";
import { Address } from "../../domain/customer/value-object/address";

describe("Customer Factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("John Doe");
    expect(customer.getId()).toBeDefined();
    expect(customer.getName()).toBe("John Doe");
    expect(customer.getAddress()).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const address = new Address("Main Street", "New York", "NY", "123", 1);

    const customer = CustomerFactory.createWithAddress("John Doe", address);
    expect(customer.getId()).toBeDefined();
    expect(customer.getName()).toBe("John Doe");
    expect(customer.getAddress()).toBe(address);
    expect(customer.isActive()).toBe(true);
  });
});
