// class aggregation, agregando as class OrderItem e Order

import { OrderItem } from "./order_item";

export class Order {
  private _id: string;
  private _customerId: string;
  private items: OrderItem[] = [];
  private total: number = 0;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this.items = items;
    this.total = this.totalOrder();
    this.validate();
  }

  validate() {
    if (!this._id) {
      throw new Error("Id is required");
    }
    if (!this.customerId) {
      throw new Error("CustomerId is required");
    }
    if (!this.items.length) {
      throw new Error("Items is required");
    }

    if (this.items.some((item) => item.getQtn() <= 0)) {
      throw new Error("Qtn must be greater than 0");
    }
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  getItems(): OrderItem[] {
    return this.items;
  }

  totalOrder(): number {
    const total = this.items.reduce((acc, item) => {
      return acc + item?.getPrice();
    }, 0);
    return total;
  }

  changeItems(items: OrderItem[]): void {
    this.items = items;
    this.total = this.totalOrder();
    this.validate();
  }
}
