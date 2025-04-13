import { job} from "../models/job.models.js";

export const postJob = async (req,res)=>{
    try {
        const {title,description,requirements,salary,location,Jobtype,experience,position,companyId}= req.body;
        const UserId= req.id;

        if(!title||!description||!requirements||!salary||!location||!Jobtype||!experience||!position||!companyId){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        const jOb = await job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary:Number(salary),
            location,
            Jobtype,
            experienceLevel:experience,
            position,
            Company:companyId,
            Created_by:UserId
        });
        return res.status(201).json({   
            message:"Job created Successfully",
            jOb,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const getAlljob= async (req,res)=>{
    try {
        const keyword = req.query.keyword|| "";
        const query = {
            $or:[
                {title:{$regex:keyword ,$options:"i"}},
                {description:{$regex:keyword ,$options:"i"}},
            ]
        };
        const jobs=await job.find(query).populate({
            path:"Company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(400).json({
                message:"Job not found",
                success: false 
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}
export const getJobById = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const Job= await job.findById(jobId);
        if(!Job){
            return res.status(400).json({
                message:"Job not found ",
                success: false
            })
        };
        return res.status(200).json({
            Job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const getAdminJobs  = async (req,res)=>{
    try {
        const adminId= req.id;
        const jobs = await job.find({Created_by:adminId});
        if(!jobs){
            return res.status(400).json({
                message:"Job not found ",
                success: false 
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}
