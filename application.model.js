import mongoose from "mongoose";
const ApplicationSchema= new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'job',
        required:true

    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Accepted','Rejected'],
        default:'Pending'
    }

},{timeseries:true});
export const Applications = mongoose.model("Application", ApplicationSchema);
