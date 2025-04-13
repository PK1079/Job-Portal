import mongoose from "mongoose";
const CompanySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
        unique:true
    },
    Description:{
        type:String
    },
    Website:{
        type:String
    },
    location:{
        type:String
    },
    Logo:{
        type:String
    },
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    }
},{timestamps:true});
export const Company = mongoose.model("Company",CompanySchema);
