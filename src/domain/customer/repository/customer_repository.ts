import { Customer } from "../entity/customer";
import { IRepositoryInterface } from "../../@Shared/repository/repository_interface";

export interface ICustomerRepository extends IRepositoryInterface<Customer> {}
