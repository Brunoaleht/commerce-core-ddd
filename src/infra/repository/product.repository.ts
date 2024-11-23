import { Order, OrderItem } from "sequelize";
import { Product } from "../../domain/entity/product";
import { IProductRepository } from "../../domain/repository/product_repository.interface";
import {
  IMetadata,
  IQueryParams,
} from "../../domain/repository/repository_interface";
import { ProductModel } from "../db/sequelize/model/product.model";

export class ProductRepository implements IProductRepository {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: { id: entity.id },
      }
    );
  }

  async find(id: string): Promise<Product | null> {
    const productModel = await ProductModel.findOne({
      where: { id },
    });

    if (!productModel) {
      return null;
    }

    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async delete(id: string): Promise<void> {
    await ProductModel.destroy({
      where: { id },
    });
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();

    const productsArray: Product[] = productModels?.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
    );

    return productsArray || [];
  }

  async paginated(params: IQueryParams): Promise<IMetadata<Product>> {
    const { page = 1, limit = 10, filters, sort } = params;

    const order: Order = sort
      ? (Object.entries(sort).map(([key, value]) => [key, value]) as Order)
      : [];

    const productModels = await ProductModel.findAndCountAll({
      where: filters,
      limit,
      order: order,
    });

    const productsArray: Product[] = productModels.rows.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
    );

    return {
      page,
      limit,
      total: productModels.count,
      data: productsArray,
    };
  }
}
