import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import  Color  from "colors";
import products from "./data/products.js";
import users from "./data/users.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js"

connectDB();
dotenv.config();


const dataImport=async()=>{
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

       const createUsers=await User.insertMany(users)
        const adminUser= createUsers[0]._id
       const sampleProduct= products.map(products=>{
           return{...products,user:adminUser}
       })
       await Product.insertMany(sampleProduct)

       console.log(`data importes`.green.bold);
        process.exit()
    } catch (error) {
        console.log(error.red.bold);
        process.exit(1)
    }
}


const dataDestroy=async()=>{
    try {
        
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        console.log('data destroy'.red.bold);
        process.exit()
    } catch (error) {
        console.log(error.red.bold);
        process.exit(1)
    }
}

if(process.argv[2]==='-d'){
    dataDestroy()
}else{
    dataImport()
}