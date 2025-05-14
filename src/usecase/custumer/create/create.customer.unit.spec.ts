import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John Doe", 
    address: {
        street: "Street 1",
        number: 1,
        zip: "Zipcode 1",
        city: "City 1"
    }
}
const MockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}

describe('Unit test create customer use case', () => {
    it('should create a customer', async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        });
    });

    it('should throw an error when name is missing', async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
            new Error("Name is required")
        );
    });

    it('should throw an error when street is missing', async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
            new Error("Street is required")
        );
    });
});