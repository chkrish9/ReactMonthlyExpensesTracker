import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import categoriesRoute from './routes/categoryRoute.js';
import expenseRoute from './routes/expenseRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send("Welcome");
});

app.use('/categories', categoriesRoute);
app.use('/expenses', expenseRoute);

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
