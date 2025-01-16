import { Order } from "../entity/order";
import { IRepositoryInterface } from "../../@Shared/repository/repository_interface";

export interface IOrderRepository extends IRepositoryInterface<Order> {}
