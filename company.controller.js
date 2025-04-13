import{Company} from "../models/company.model.js";
export const registerCompany = async(req, res)=>{
    try {
        const { companyName }= req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name  is required",
                success:false
            })
        }
        let company = await Company.findOne({companyName});
        if(company){
            return res.status(400).json({
                message:"You can't register for a same company ",
                success:false
            })
        };
        company = await Company.create({
            companyName: companyName,
            UserId:req.Id
        });

        return res.status(200).json({
            message:"Company registered successfully",
            company,
            success:true
        })    
    } catch (error) {
        console.log(error);
        
    }
}
export const getCompany = async(req,res)=>{
    try {
        const UserId= req.Id;
        const companies= await Company.find({UserId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}
export const getCompanyById = async(req,res)=>{
    try {
        const companyId = req.params.Id;
        const company= await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const Updatecompany = async(req,res)=>{
    try {
        const{companyName,Description,Website,location}= req.body;
        const file = req.file;
        const updateData = {companyName,Description,Website,location} ;
        const company = await Company.findByIdAndUpdate(req.params.Id,updateData,{new: true});
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Company information updated",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}
