import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const MONGO_URI=process.env.MONGO_URI
const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(MONGO_URI,)

        console.log(`MongoDB connect: ${conn.connection.host}`.cyan.underline);
        
    } catch (error) {
        console.error(`failed due to this : ${error.message}`.red.underline);
        process.exit(1)
    }
}
export default connectDB