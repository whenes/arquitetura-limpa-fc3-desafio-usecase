import { app, sequelize } from "../express";
import request from "supertest";

describe('Product E2E Tests', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a product type B', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                type: 'b',
                name: 'Product B',
                price: 100
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Product B');
        expect(response.body.price).toBe(200);
    });

    it('should create a product type A', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                type: 'a',
                name: 'Product A',
                price: 100
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Product A');
        expect(response.body.price).toBe(100);
    });

    it('should not create a product', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                name: 'Product A',
            });

        expect(response.status).toBe(500);
    });

    it('should list all products', async () => {
        await request(app)
            .post('/product')
            .send({
                type: 'a',
                name: 'Product A',
                price: 100
            });
        await request(app)
            .post('/product')
            .send({
                type: 'b',
                name: 'Product B',
                price: 150
            });
        const response = await request(app)
            .get('/product')
            .send({});

        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(2);
    });

    it('should found a product by id', async () => {
        await request(app)
            .post('/product')
            .send({
                type: 'a',
                name: 'Product A',
                price: 100
            });

        const productCreated = await request(app)
            .get('/product')
            .send({});
        const productId = productCreated.body.products[0].id;

        const response = await request(app)
            .get('/product')
            .send({id: productId});

        expect(response.status).toBe(200);
        expect(response.body.products[0].id).toBe(productId);
    });

    it('should update a product', async () => {
        await request(app)
            .post('/product')
            .send({
                type: 'a',
                name: 'Product A',
                price: 100
            });

        const productCreated = await request(app)
            .get('/product')
            .send({});
        const productId = productCreated.body.products[0].id;


        const responseUpdate = await request(app)
            .put('/product')
            .send({
                id: productId,
                name: 'Product A Updated',
                price: 200
            });

        const response = await request(app)
            .get('/product')
            .send({id: productId});

        expect(response.status).toBe(200);
        expect(response.body.products[0].id).toBe(productId);
        expect(response.body.products[0].name).toBe('Product A Updated');
        expect(response.body.products[0].price).toBe(200);
    });
});