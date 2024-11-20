import { Product } from "../entity/product";

export class ProductService {
  static increasePrice(products: Product[], percentage: number): Product[] {
    products.forEach((product) => {
      const incrementValeu = (product.getPrice() * percentage) / 100;
      const newPrice = product.getPrice() + incrementValeu;
      product.changePrice(newPrice);
    });

    return products;
  }
}
