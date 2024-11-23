import { Customer } from "../entity/customer";
import { IRepositoryInterface } from "./repository_interface";

export interface ICustomerRepository extends IRepositoryInterface<Customer> {}
