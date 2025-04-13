import mongoose from "mongoose";
const Userschema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Student','Recruiter'],
        required:true
    },
    Profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.ObjectId,ref:'Company'},
        Profilephoto:{
            type:String,
            default:""
        }
    },
},{timestamps:true});
export const User = mongoose.model('user',Userschema);
    
    
    
    
    

