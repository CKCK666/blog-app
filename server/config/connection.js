import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const  connectDB= async ()=> {
    const dbconn= await mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log("db is connnected"))
    .catch((error)=>console.log(error.message))
   
}

export default connectDB