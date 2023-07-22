import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Customer from 'App/Models/Customer'
import CustomerService from 'App/Services/CustomerService';
const uuid = require("uuid");

export default class CustomersController {

    // Method for creating customer.
    public async createCustomer(ctx: HttpContextContract){

        const {response,request} = ctx

        // validatins
        await request.validate({
            schema: schema.create({
                name: schema.string(),
                email: schema.string(),
                phoneNumber: schema.string()
            }),

            // validation messages
            messages: {
                'name.required': 'Name is required',
                'email.required': 'Email is required',
                'phoneNumber.required': 'Phone number is required'
            }
        })

        const {name, email, phoneNumber} = request.all()

        const newCustomer = new Customer()
        newCustomer.id = uuid.v4()
        newCustomer.name = name
        newCustomer.email = email
        newCustomer.number = phoneNumber

        await newCustomer.save()
        return response.status(200).send({status: 200, message: "Customer created successfully."})
    }


    // Method for getting the list of customers
    public async getCustomer(ctx: HttpContextContract){
        const {response} = ctx
        const data = await Customer.query().select('*').orderBy('created_at', 'desc')

        if(!data) return response.status(422).send({status: 422, message: "Data not found"})

        return response.status(200).send({status: 200, message: "Customers fetched successfully.", data})
    }

    // Method to delete the customer 
    public async deleteCustomer(ctx: HttpContextContract){
        const {response, request} = ctx

        // getting id of the customer
        const customerId = request.param("id")

        // find customer with the help of provided id
        const existsCustomer = await Customer.query().where('id', customerId).first()

        // if customer does not exists
        if(!existsCustomer) return response.status(422).send({status: 422, message: "Customer does not exists."})

        await existsCustomer.delete()

        return response.status(200).send({status: 200, message: "Customer deleted successfully from our system."})
    }

    // Method for update the exists customer
    public async updateCustomer(ctx: HttpContextContract){
        const {request, response} = ctx
         
        const {id, name, email, number} = request.all()

        const existsCustomer = await Customer.query().where('id', id).first()

        if(!existsCustomer) return response.status(422).send({status: 422, message: "Customer does not exists."})

        const customerService = new CustomerService()
        const updatedData = await customerService.updateCustomer(existsCustomer, name, email, number)

        if(!updatedData) return response.status(422).send({status: 422, message: "Failed to update customer."})

        return response.status(200).send({status: 200, message: "Customer updated successfully.", updatedData})
    }
}
