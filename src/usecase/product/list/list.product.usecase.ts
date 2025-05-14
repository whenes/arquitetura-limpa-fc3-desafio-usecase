import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {}

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const result = await this.productRepository.findAll();
        return this.mapProductsToOutputProducts(result);
    }

    mapProductsToOutputProducts(products: ProductInterface[]): OutputListProductDto {
        return {
            products: products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        };
    }
}   