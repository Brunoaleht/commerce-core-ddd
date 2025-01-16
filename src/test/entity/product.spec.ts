import { Product } from "../../domain/product/entity/product";

describe("Product unit test", () => {
  it("should throw error when id empty", () => {
    expect(() => {
      let product = new Product("", "product 1", 100);
    }).toThrow("Id is required");
  });

  it("should throw error when name empty", () => {
    expect(() => {
      let product = new Product("123", "", 100);
    }).toThrow("Name is required");
  });

  it("should throw error when price less than 0", () => {
    expect(() => {
      let product = new Product("123", "product 1", -100);
    }).toThrow("Price must be greater than 0");
  });

  it("should change the product name to the new provided value", () => {
    let product = new Product("123", "product 1", 100);
    product.changeName("product 2");
    expect(product.getName()).toBe("product 2");
  });

  it("should change the product price to the new provided value", () => {
    const product = new Product("123", "product 1", 100);
    product.changePrice(200);
    expect(product.getPrice()).toBe(200);
  });

  it("should return the product id", () => {
    const product = new Product("123", "product 1", 100);
    expect(product.getId()).toBe("123");
  });

  it("should return the product name", () => {
    const product = new Product("123", "product 1", 100);
    expect(product.getName()).toBe("product 1");
  });

  it("should return the product price", () => {
    const product = new Product("123", "product 1", 100);
    expect(product.getPrice()).toBe(100);
  });

  it("should throw error when changing name to empty", () => {
    const product = new Product("123", "product 1", 100);
    expect(() => {
      product.changeName("");
    }).toThrow("Name is required");
  });

  it("should throw error when changing price to less than 0", () => {
    const product = new Product("123", "product 1", 100);
    expect(() => {
      product.changePrice(-10);
    }).toThrow("Price must be greater than 0");
  });

  it("should update price to a small positive value", () => {
    const product = new Product("123", "product 1", 100);
    product.changePrice(0.01);
    expect(product.getPrice()).toBe(0.01);
  });

  it("should validate product with valid properties", () => {
    const product = new Product("123", "product 1", 100);
    expect(product.validade()).toBe(true);
  });
});
