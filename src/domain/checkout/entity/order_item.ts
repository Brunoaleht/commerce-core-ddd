export class OrderItem {
  private _id: string;
  private _name: string;
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
    this._id = id;
    this._name = name;
    this.price = price;
    this.productId = productId;
    this.qtn = qtn;
    this.validade();
  }

  validade() {
    if (!this._id) {
      throw new Error("Id is required");
    }
    if (!this._name) {
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

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  getPrice(): number {
    return this.price * this.qtn;
  }

  getQtn(): number {
    return this.qtn;
  }

  getProductId(): string {
    return this.productId;
  }
}
