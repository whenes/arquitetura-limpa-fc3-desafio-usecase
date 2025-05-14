import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ListProductUseCase from "./list.product.usecase";

const mockedProduct1 = new Product('1', 'Product 1', 100);
const mockedProduct2 = new Product('2', 'Product 2', 200);

const mockedProductRepository: ProductRepositoryInterface = {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([mockedProduct1, mockedProduct2])),
    create: jest.fn(),
    update: jest.fn()
};

describe('ListProductUseCase', () => {
    it('should list products', async () => {
        const usecase = new ListProductUseCase(mockedProductRepository);
        const result = await usecase.execute({});
        expect(result.products.length).toBeGreaterThan(1);
        expect(result.products[0].id).toEqual(mockedProduct1.id);
        expect(result.products[1].id).toEqual(mockedProduct2.id);        
    });
});