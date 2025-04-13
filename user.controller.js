import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register= async(req,res)=>{
    try {
        const{fullname,email,phoneNumber,password,role}=req.body;
        if(!fullname||!email||!phoneNumber||!password||!role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        }; 
        const user =await User.findOne({email}); 
        if(user){
            return res.status(400).json({
                message:"User already exsisting with this email",
                success:false ,
            })
        } 
        const hashedPassword =await bcrypt.hash(password,10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role
             
        });
        return res.status(210).json({
            message:"Account created succesfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
        
    }
}
export const login = async(req,res)=>{
    try {
        const{email,password,role}=req.body 
        if(!email||!password||!role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        };  
        let user= await User.findOne({email}); 
        if(!user){
            return res.status(400).json({
                message:"Incorret Email or password",
                success:false,
            })
        }
        const isPasswordmatch = await bcrypt.compare(password,user.password);
        if(!isPasswordmatch){
            return res.status(400).json({
                message:"Incorrect Password",
                success:false
            })
        };
        if(role!=user.role){
            return res.status(400).json({
                message:"Account does not have the role",
                success:false
            })
        };

        const TokenData ={
            userId:user._id
        }
        const token= await jwt.sign(TokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        user={
            _id:user._id,
            fullname: user.fullname,
            email:user.email,
            PhoneNumber:user.phoneNumber,
            role:user.role,
            Profile:user.Profile,

        }
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict' }).json({
            message:`Welcome Back ${user.fullname}` ,
            user,
            success:true
        })

    } catch (error) {
        console.log(error);
        
        
    }
}
export const logout = async(req,res)=>{
    try {
        return res.status(201).cookie("token","",{maxAge:0}).json({
            message:"logout successfull",
            success:true   
        })
        
    } catch (error) {
        console.log(error);
        
        
    }
}
export const updateProfile = async(req,res)=>{
    try {
        const{fullname,email,phoneNumber,bio,skills}=req.body;
        const file = req.file;
        let skillArray;
        if(skills){
            skillArray = skills.split(",");
        }
        const userId=req.id;
        let  user  = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found ",
                success:false
            })
        }
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.Profile.bio= bio;
        if(skills) user.Profile.skills= skillArray;
        
        

        await user.save(); 

        user={
            _id:user._id,
            fullname: user.fullname,
            email:user.email,
            PhoneNumber:user.phoneNumber,
            role:user.role,
            Profile:user.Profile,

        }
        return res.status(200).json({
            message:"Profile updated Successfully",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}