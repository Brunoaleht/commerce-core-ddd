import OrderFactory, {
  OderFactoryProps,
} from "../../domain/checkout/factory/order.factory";
import { v4 as uuid } from "uuid";
describe("Order Factory unit test", () => {
  it("should create an order", () => {
    const orderProps: OderFactoryProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: "Product A",
          price: 10,
          productId: uuid(),
          quantity: 1,
        },
        {
          id: uuid(),
          name: "Product B",
          price: 20,
          productId: uuid(),
          quantity: 2,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);
    expect(order.id).toEqual(orderProps.id);
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.getItems().length).toBe(2);
  });
});
