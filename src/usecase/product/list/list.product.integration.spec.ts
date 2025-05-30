import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ListProductUseCase from "./list.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe('Test list product usecase', () => {
    let sequelize: Sequelize
    const productRepository = new ProductRepository();
    const listUsecase = new ListProductUseCase(productRepository);
    const createUsecase = new CreateProductUseCase(productRepository);

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync()

        const product1 = { type: "a", name: "Product 1", price: 100};
        const product2 = { type: "a", name: "Product 2", price: 200};
        const product3 = { type: "a", name: "Product 3", price: 300};

        await createUsecase.execute(product1);
        await createUsecase.execute(product2);
        await createUsecase.execute(product3);
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should list all products', async () => {
        const result = await listUsecase.execute({});
        expect(result.products.length).toEqual(3);
    });
});