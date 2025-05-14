import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const mockedInputProduct: InputCreateProductDto = {
    type: 'a',
    name: 'Product 1',
    price: 100,
};

const mockedOutputProduct: OutputCreateProductDto = {
    id: expect.any(String),
    name: 'Product 1',
    price: 100,
};

const mockedProductRepository: ProductRepositoryInterface = {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
};

describe('CreateProductUseCase', () => {
    it('should create a product', async () => {
        const usecase = new CreateProductUseCase(mockedProductRepository);
        const result = await usecase.execute(mockedInputProduct);
        expect(result).toEqual({
            id: mockedOutputProduct.id, 
            name: mockedOutputProduct.name, 
            price: mockedOutputProduct.price
        });
    });
});