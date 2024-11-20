export class Product {
  private id: string;
  private name: string;
  private price: number;

  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.validade();
  }

  validade(): boolean {
    if (!this.id) {
      throw new Error("Id is required");
    }

    if (!this.name) {
      throw new Error("Name is required");
    }

    if (this.price <= 0) {
      throw new Error("Price must be greater than 0");
    }

    return true;
  }

  getId(): string {
    return this.id;
  }

  changeName(name: string): void {
    this.name = name;
    this.validade();
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  changePrice(price: number): void {
    this.price = price;
    this.validade();
  }
}
