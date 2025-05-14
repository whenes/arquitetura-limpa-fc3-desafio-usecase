import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import UpdateProductUseCase from "./update.product.usecase";

const mockedProduct: Product = new Product(
    '1',
    'Product 1',
    100,
);

const mockedProductRepository: ProductRepositoryInterface = {
    find: jest.fn().mockReturnValue(Promise.resolve(mockedProduct)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
};

describe('UpdateProductUseCase', () => {
    it('should update a product', async () => {
        const usecase = new UpdateProductUseCase(mockedProductRepository);
        const result = await usecase.execute({id: '1', name: 'Updated Product', price: 150});
        expect(result.id).toEqual('1');
        expect(result.name).toEqual('Updated Product');
        expect(result.price).toEqual(150);
    });
});