import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../infra/db/sequelize/model/product.model";
import { Product } from "../../domain/entity/product";
import { ProductRepository } from "../../infra/repository/product.repository";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: "1" },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    let productModel = await ProductModel.findOne({
      where: { id: "1" },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    productModel = await ProductModel.findOne({
      where: { id: "1" },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 200,
    });
  });

  it("should find product by id", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    const productFound = await productRepository.find("1");

    expect(productModel.toJSON()).toStrictEqual({
      id: productFound?.id,
      name: productFound?.name,
      price: productFound?.price,
    });
  });

  it("should return null if product not found", async () => {
    const productRepository = new ProductRepository();

    const productFound = await productRepository.find("1");

    expect(productFound).toBeNull();
  });

  it("should return all products", async () => {
    const productRepository = new ProductRepository();

    for (let i = 1; i <= 5; i++) {
      const product = new Product(i.toString(), `Product ${i}`, 100 * i);
      await productRepository.create(product);
    }

    const products = await productRepository.findAll();

    expect(products.length).toBe(5);
  });

  it("should delete a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    let productModel = await ProductModel.findOne({
      where: { id: "1" },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    await productRepository.delete("1");

    productModel = await ProductModel.findOne({
      where: { id: "1" },
    });

    expect(productModel).toBeNull();
  });

  it("should paginate products", async () => {
    const productRepository = new ProductRepository();

    for (let i = 1; i <= 15; i++) {
      const product = new Product(i.toString(), `Product ${i}`, 100 * i);
      await productRepository.create(product);
    }

    const metadata = await productRepository.paginated({ page: 2, limit: 5 });

    expect(metadata.page).toBe(2);
    expect(metadata.limit).toBe(5);
    expect(metadata.total).toBe(15);
    expect(metadata.data.length).toBe(5);
  });
});
