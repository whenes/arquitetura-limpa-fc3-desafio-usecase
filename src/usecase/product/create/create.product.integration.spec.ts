import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "./create.product.usecase";
import ListProductUseCase from "../list/list.product.usecase";

describe('Test create product usecase', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync()
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        const productRepository = new ProductRepository();
        const createUsecase = new CreateProductUseCase(productRepository);
        const listUsecase = new ListProductUseCase(productRepository);

        let allProducts = await listUsecase.execute({});
        expect(allProducts.products.length).toEqual(0); 
        
        await createUsecase.execute({type: "a", name: "Product 1", price: 100});

        allProducts = await listUsecase.execute({});
        expect(allProducts.products.length).toEqual(1);
        expect(allProducts.products[0].id).toEqual(expect.any(String));
        expect(allProducts.products[0].name).toEqual("Product 1");
        expect(allProducts.products[0].price).toEqual(100);
    });

    it('should throw an error missing name', async () => {
        const productRepository = new ProductRepository();
        const createUsecase = new CreateProductUseCase(productRepository);
        const listUsecase = new ListProductUseCase(productRepository);

        let allProducts = await listUsecase.execute({});
        expect(allProducts.products.length).toEqual(0); 
        expect(() => {
            return createUsecase.execute({type: "a", name: "", price: 100});
        }).rejects.toThrow("Name is required");
    });

    it('should throw an error missing price null', async () => {
        const productRepository = new ProductRepository();
        const createUsecase = new CreateProductUseCase(productRepository);
        const listUsecase = new ListProductUseCase(productRepository);

        let allProducts = await listUsecase.execute({});
        expect(allProducts.products.length).toEqual(0); 
        expect(() => {
            return createUsecase.execute({type: "a", name: "Teste", price: null});
        }).rejects.toThrow("notNull Violation: ProductModel.price cannot be null");
    });
});