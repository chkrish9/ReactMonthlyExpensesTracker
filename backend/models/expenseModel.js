import mongoose from "mongoose";
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const expenseSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        price:{
            type: SchemaTypes.Decimal128,
            required: true
        },
        category:{
            required:true,
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    },
    {
        timestamps:true
    }
);
export const Expense = mongoose.model('Expense', expenseSchema);