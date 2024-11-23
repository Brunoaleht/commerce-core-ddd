import { Product } from "../entity/product";
import { IRepositoryInterface } from "./repository_interface";

export interface IProductRepository extends IRepositoryInterface<Product> {}
