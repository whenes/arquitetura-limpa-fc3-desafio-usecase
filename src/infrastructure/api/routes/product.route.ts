import express, {Request, Response} from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());
    try {
        const productDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price,
        };

        const output = await usecase.execute(productDto);
        res.status(200).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    try {
        const output = await usecase.execute({});
        res.status(200).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.put("/", async (req: Request, res: Response) => {
    const usecase = new UpdateProductUseCase(new ProductRepository());
    try {
        const output = await usecase.execute(req.body);
        res.status(200).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});