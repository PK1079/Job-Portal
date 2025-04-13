import { Applications } from "../models/application.model.js";
import { job} from "../models/job.models.js";

export const applyJob = async (req,res)=>{
    try {
        const UserId = req.id;
        const jobId =req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job id is required",
                success:false
            })
        };
        const exisistingApplication= await Applications.findOne({job:jobId,applicant:UserId});
        if(exisistingApplication){
            return res.status(400).json({
                message:"You have already applied for this job",
                success:false
            });
        }
        const Job = await job.findById(jobId);
        if(!Job){
            return res.status(400).json({
                message:"Job Not found ",
                success:false 
            })
        }
        const newApllication = await Applications.create({
            job : jobId,
            applicant : UserId,
        });
        Job.applications.push(newApllication._id);
        await Job.save();
        return res.status(200).json({
            message:"Job applied successfully",
            success:true 
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const getAppliedJobs = async (req,res)=>{
    try {
        const UserId = req.id;
        const application = await Applications.find({applicant:UserId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'Company',
                options:{sort:{createdAt:-1}}
            }
        });
        if(!application){
            return res.status(400).json({
                message:"No applications found",
                success:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const getApplicants = async (req,res)=>{
    try {
        const jobid= req.params.id;
        const Job = await job.findById(jobid).populate({
            path:'applications',
            options: {sort:{createdAt:-1}},
            populate:{
                path: 'applicant'
            }
        });
        if(!Job){
            return res.status(400).json({
                message:"Job not found",
                success:false
            })
        };
        return res.status(200).json({
            Job,
            message:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res)=>{
    try {
        const {status}=req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:"Status is required",
                success:false
            })
        }
        const Application = await Applications.findByIdAndUpdate(
            applicationId,
            { status },
            { new: true }
          );
        if(!Application){
            return res.status(400).json({
                message:"Application not found",
                success:false
            })
        }
        await Application.save();
        return res.status(200).json({
            message:"Status updated successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}