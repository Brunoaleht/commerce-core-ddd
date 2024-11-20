export class OrderItem {
  private id: string;
  private name: string;
  private price: number;
  private productId: string;
  private qtn: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    qtn: number
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.productId = productId;
    this.qtn = qtn;
    this.validade();
  }

  validade() {
    if (!this.id) {
      throw new Error("Id is required");
    }
    if (!this.name) {
      throw new Error("Name is required");
    }
    if (this.price <= 0) {
      throw new Error("Price must be greater than 0");
    }
    if (!this.productId) {
      throw new Error("ProductId is required");
    }
    if (this.qtn <= 0) {
      throw new Error("Qtn must be greater than 0");
    }

    return true;
  }

  getPrice(): number {
    return this.price * this.qtn;
  }

  getQtn(): number {
    return this.qtn;
  }
}
