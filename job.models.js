import mongoose from "mongoose";
const jobSchemea = new mongoose.Schema({
    title:{
        type:String,
        reqired:true
    },
    description:{
        type:String,
        reqired:true
    },
    requirements:[{
        type:String
    }],
    salary:{
        type:Number,
        reqired:true
    },
    experienceLevel:{
        type:Number,
        required:true
    },
    Location:{
        type:String,
        reqired:true
    },
    Jobtype:{
        type:String,
        required:true
    },
    Position:{
        type:String,
        reqired:true
    },
    Company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        reqired:true
    },
    Created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        reqired:true
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application',
        reqired:true
    }],
},{timestamps:true});
export const job = mongoose.model("job",jobSchemea);