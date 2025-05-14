import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) {}

    async execute(id: string): Promise<OutputFindProductDto> {
        const result = await this.productRepository.find(id);
        return {
            id: result.id,
            name: result.name,
            price: result.price,
        };
    }
}