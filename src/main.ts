import { Address } from "./domain/entity/address";
import { Customer } from "./domain/entity/customer";
import { Order } from "./domain/entity/order";
import { OrderItem } from "./domain/entity/order_item";

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
