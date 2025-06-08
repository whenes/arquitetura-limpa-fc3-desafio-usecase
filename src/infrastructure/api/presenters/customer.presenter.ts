import { toXML } from "jstoxml";
import { OutputListCustomerDTO } from "../../../usecase/custumer/list/list.customer.dto";

export default class CustomerPresenter {
    static listXML(data: OutputListCustomerDTO): string {
        const xmlOption = {
            header: true,
            indent: "  ",
            newline: "\n",
            allowEmpty: true,
        }

        return toXML(
            {
                cutomers: {
                    customer: data.customers.map(customer => ({
                        id: customer.id,
                        name: customer.name,
                        address: {
                            street: customer.address.street,
                            number: customer.address.number,
                            city: customer.address.city,
                            zip: customer.address.zip
                        }
                    }))
                }
            }, 
            xmlOption
        );
    }
}