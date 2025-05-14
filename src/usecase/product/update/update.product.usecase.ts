import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";

export default class UpdateProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {}

    async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
        const product: Product = await this.productRepository.find(input.id);
        product.changeName(input.name);
        product.changePrice(input.price);
        await this.productRepository.update(product);
        return this.mapProductToOutputProduct(product);
    }

    mapProductToOutputProduct(product: Product): OutputUpdateProductDTO {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}