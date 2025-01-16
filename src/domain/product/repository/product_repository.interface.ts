import { IRepositoryInterface } from "../../@Shared/repository/repository_interface";
import { Product } from "../entity/product";

export interface IProductRepository extends IRepositoryInterface<Product> {}
