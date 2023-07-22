import Customer from "App/Models/Customer";

export default class CustomerService{

    async updateCustomer(existsCustomer: Customer, name: string, email: string, number: string){

        existsCustomer.name = name
        existsCustomer.email = email
        existsCustomer.number = number

        await existsCustomer.save()

        return existsCustomer
        
    }
}