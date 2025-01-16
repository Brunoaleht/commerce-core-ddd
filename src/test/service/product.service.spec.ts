import { Product } from "../../domain/product/entity/product";
import { ProductService } from "../../domain/product/service/product.service";

describe("ProductService unit test", () => {
  it("should change the prices of all products", () => {
    const product1 = new Product("1", "product 1", 10);
    const product2 = new Product("2", "product 2", 20);

    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.getPrice()).toBe(20);
    expect(product2.getPrice()).toBe(40);
  });
});
