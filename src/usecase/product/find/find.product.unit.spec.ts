import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import FindProductUseCase from "./find.product.usecase";

const mockedProduct: Product = new Product('1', 'Product 1', 100);


const mockedProductRepository: ProductRepositoryInterface = {
    find: jest.fn().mockReturnValue(Promise.resolve(mockedProduct)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
};

describe('FindProductUseCase', () => {
    it('Should find product by id', async () => {
        const usecase = new FindProductUseCase(mockedProductRepository);
        const result = await usecase.execute(mockedProduct.id);
        expect(result).toEqual({id: mockedProduct.id, name: mockedProduct.name, price: mockedProduct.price});
    });
});