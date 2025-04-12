const User=require('../models/User');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const {generateAccessToken,generateRefreshToken}=require('../utils/auth');
const createUser=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const hashedPassword=await bcrypt.hash(password,10);
        const UserResponse=await User.create({name,email,password:hashedPassword});
        const user= await User.findById(UserResponse._id).select('-password');
        res.status(201).json({message:"User created successfully",user});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:"error creating admin",error});
    }
  }

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const UserResponse=await User.findOne({email});
        if(!UserResponse){
            return res.status(400).json({message:"User not found"});
        }
        const validPassword=await bcrypt.compare(password,UserResponse.password);
        if(!validPassword){
            return res.status(400).json({message:"invalid password"});
        }
        const accessToken=generateAccessToken(UserResponse._id);
        const refreshToken=generateRefreshToken(UserResponse._id);
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            sameSite:'None',
            secure:true
        });
        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            sameSite:'None',
            secure:true
        });
        const user= await User.findById(UserResponse._id).select('-password');
        res.status(200).json({message:"login successful",user});
    }
    catch(error){

        res.status(500).json({message:"an error occured",error:error.message});
    }
  }
  
module.exports={
    createUser,
    loginUser,
}