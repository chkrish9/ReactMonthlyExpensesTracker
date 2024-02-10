import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

import { Category } from "./models/categoryModel.js";

const app = express();

app.use(express.json());

app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send("Welcome");
});

app.post('/category', async (request, response)=>{
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

app.get('/categories', async(request, response)=>{
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

app.get('/categories/:id', async(request, response)=>{
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

app.put('/category/:id', async (request, response)=>{
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

app.delete('/category/:id', async(request, response)=>{
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

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log("Connected to Mongo");
    app.listen(PORT, ()=>{
        console.log(`App is listening to port: ${PORT}`)
    })
})
.catch((error)=>{
    console.error(error)
});
