import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobroute from "./routes/job.route.js";
import appicationRoute from "./routes/applicantion.routes.js";


dotenv.config({})

const app = express();
app.get("/home",(req,res)=>{
    return res.status(200).json({
        message:"I am comming from backend",
        success:true
    }); 
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
const corsOptions={
    origin:'http/localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));
const PORT =process.env.PORT || 3000;

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobroute);
app.use("/api/v1/application",appicationRoute);

app.listen(PORT ,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);

})
