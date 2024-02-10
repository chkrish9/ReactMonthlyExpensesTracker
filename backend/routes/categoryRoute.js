import express from 'express';
import { Category } from "../models/categoryModel.js";

const router = express.Router()

router.post('/', async (request, response)=>{
    try{
        if(!request.body.name){
            return response.status(400).send({
                message:"Required field missing."
            })
        }

        const newCategory = {
            name:request.body.name
        }

        const category = await Category.create(newCategory);
        return response.status(201).send(category);
    }catch(error){
        response.status(500).send({
            message: error.message
        })
    }
});

router.get('/', async(request, response)=>{
    try{
        const categories = await Category.find({});
        return response.status(200).send({
            count: categories.length,
            data: categories
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
        const category = await Category.findById(id);
        return response.status(200).send(category);
    }catch(error){
        response.status(500).send({
            message: error.message
        })
    }
});

router.put('/:id', async (request, response)=>{
    try{
        if(!request.body.name){
            return response.status(400).send({
                message:"Required field missing."
            })
        }

        const { id } = request.params;

        const category = await Category.findByIdAndUpdate(id, request.body);
        if(!category){
            return response.status(404).send({
                message: "Category not found!"
            })
        }

        return response.status(200).send({
            message: "Category updated successfully."
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
        const result = await Category.findByIdAndDelete(id); 
        if(!result){
            return response.status(404).send({
                message: "Category not found!"
            })
        }

        return response.status(200).send({
            message: "Category deleted successfully."
        });
    }catch(error){
        response.status(500).send({
            message: error.message
        })
    }
});

export default router;