import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";

interface OrderFactoryItems {
  id: string;
  name: string;
  price: number;
  productId: string;
  quantity: number;
}

export interface OderFactoryProps {
  id: string;
  customerId: string;
  items: OrderFactoryItems[];
}

export default class OrderFactory {
  public static create(props: OderFactoryProps): Order {
    const items = props.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.productId,
        item.quantity
      );
    });

    return new Order(props.id, props.customerId, items);
  }
}
