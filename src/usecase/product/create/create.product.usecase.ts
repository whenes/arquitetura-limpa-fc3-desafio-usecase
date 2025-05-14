import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";

export default class CreateProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {}

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const productInterface = ProductFactory.create(input.type, input.name, input.price); 
        await this.productRepository.create(this.mapProductInterfaceToProduct(productInterface));
        return this.mapProductIntefaceToOutputProduct(productInterface);
    }

    mapProductIntefaceToOutputProduct(productInterface: ProductInterface): OutputCreateProductDto {
        return {
            id: productInterface.id,
            name: productInterface.name,
            price: productInterface.price,
        };
    }

    mapProductInterfaceToProduct(productInterface: ProductInterface): Product {
        return new Product(
            productInterface.id,
            productInterface.name,
            productInterface.price
        );
    }
}