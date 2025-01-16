import { Address } from "./domain/customer/value-object/address";

import { OrderItem } from "./domain/checkout/entity/order_item";
import { Order } from "./domain/checkout/entity/order";
import { Customer } from "./domain/customer/entity/customer";

//agregado de customer
let customer = new Customer("123", "John Doe");
const address = new Address("Street 1", "City 1", "State 1", "6666666", 1);
customer.Address = address;

//relação de agregado de customer com order por id
//agregado de order
const item1 = new OrderItem("1", "item 1", 100, "2", 1);
const item2 = new OrderItem("2", "item 2", 100, "3", 1);
let order = new Order("1", customer.getId(), [item1, item2]);

console.log(customer);
console.log(order);
