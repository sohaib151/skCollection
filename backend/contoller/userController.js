import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import  generateToken  from "../utils/generateToken.js";



// @ dece     auth user
// @ route    post /users/login
// @access   public
const authUser=asyncHandler(async(req,res)=>{
    const { email,password} =req.body
    // res.send({email,password})
    const user= await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

// @ dece     get user prifile
// @ route    get /users/profile
// @access   private

const getUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
           
        })
    }else{
        res.status(404)
        throw new Error('not found')
    }
})


// @ dece     user register
// @ route    post /users/
// @access   public
const registerUser=asyncHandler(async(req,res)=>{
    const { name,email,password} =req.body
    // res.send({email,password})
    const userExist= await User.findOne({email})

    if(userExist){
     res.status(400)
     throw new Error('user Already Register')
    }
const user=await User.create({
    name,
    email,
    password,
})
   if(user){
       res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
       })
   }else{
     res.status(400)
     throw new Error('invalid user data')
   }
})



// @ dece     update user prifile
// @ route    put/users/profile
// @access   private

const updateUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if(user){
       user.name=req.body.name || user.name
       user.email=req.body.email || user.email
       if(req.body.password){
           user.password=req.body.password
       }

       const updatedUser=await user.save()

       res.json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
        token:generateToken(updatedUser._id)
    })
    }else{
        res.status(404)
        throw new Error('not found')
    }
})


// @ dece     get All users
// @ route    get/users
// @access   private/admin

const getUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({})
   res.json(users)
})

// @ dece     Delete  user
// @ route    Dellete/user
// @access   private/admin

const deleteUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user){
   await user.remove()
   res.json({message:'user Remove'})
    }else{
        res.status(401)
        throw new Error('User not Found')
    }
})


// @ dece     get user by id
// @ route    get/user/:id
// @access   private/admin

const getUserById=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id).select('-password')
    if(user){
    res.json(user)
    }else{
        res.status(401)
        throw new Error('User not Found')
    }
})

// @ dece     update user by Admin
// @ route    put/users/:id
// @access   private

const updateUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user){
       user.name=req.body.name || user.name
       user.email=req.body.email || user.email
       user.isAdmin=req.body.isAdmin || user.isAdmin

       const updatedUser=await user.save()

       res.json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
       
    })
    }else{
        res.status(404)
        throw new Error('not found')
    }
})

export{authUser , getUserProfile,registerUser,updateUserProfile,getUsers,deleteUser,getUserById,updateUser}