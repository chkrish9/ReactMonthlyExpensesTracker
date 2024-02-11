import express from 'express';
import { Expense } from "../models/expenseModel.js";

const router = express.Router()

router.post('/', async (request, response)=>{
    try{
        if(!request.body.name 
            || !request.body.price
            || !request.body.category){
            return response.status(400).send({
                message:"Required field missing."
            })
        }

        const newExpense = {
            name:request.body.name,
            price:request.body.price,
            category:request.body.category
        }

        const expense = await Expense.create(newExpense);
        return response.status(201).send(expense);
    }catch(error){
        response.status(500).send({
            message: error.message
        })
    }
});

router.get('/', async(request, response)=>{
    try{
        const expenses = await Expense.find({}).populate('category');
        return response.status(200).send({
            count: expenses.length,
            data: expenses
        });
    }catch(error){
        response.status(500).send({
            message: error.message
        })
    }
});

router.get('/:id', async(request, response)=>{
    try{
        const { id } = request.params;
        const expense = await Expense.findById(id).populate('category');
        return response.status(200).send(expense);
    }catch(error){
        response.status(500).send({
            message: error.message
        })
    }
});

router.put('/:id', async (request, response)=>{
    try{
        if(!request.body.name 
            || !request.body.price
            || !request.body.category){
            return response.status(400).send({
                message:"Required field missing."
            })
        }

        const { id } = request.params;

        const expense = await Expense.findByIdAndUpdate(id, request.body);
        if(!expense){
            return response.status(404).send({
                message: "Expense not found!"
            })
        }

        return response.status(200).send({
            message: "Expense updated successfully."
        });

    }catch(error){
        response.status(500).send({
            message: error.message
        })
    }
});

router.delete('/:id', async(request, response)=>{
    try{
        const { id } = request.params;
        const result = await Expense.findByIdAndDelete(id); 
        if(!result){
            return response.status(404).send({
                message: "Expense not found!"
            })
        }

        return response.status(200).send({
            message: "Expense deleted successfully."
        });
    }catch(error){
        response.status(500).send({
            message: error.message
        })
    }
});

export default router;