import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ListProductUseCase from "../list/list.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

describe('Test update product usecase', () => {
    let sequelize: Sequelize
    const productRepository = new ProductRepository();
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

    it('should update a product', async () => {
        const updateUsecase = new UpdateProductUseCase(productRepository);
        const listUsecase = new ListProductUseCase(productRepository);

        const result = await listUsecase.execute({});
        const product = result.products[0];
        product.name = "Product 1 updated";
        product.price = 150;

        await updateUsecase.execute({
            id: product.id,
            name: product.name,
            price: product.price
        });

        const result2 = await listUsecase.execute({});
        expect(result2.products[0].name).toEqual("Product 1 updated");
        expect(result2.products[0].price).toEqual(150);
    });
});