import User from "../Models/auth.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

import jwt from "jsonwebtoken";

export const login = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
           return res.status(401).json({msg: "User does not exist"});
        }
        const matchUser = await bcrypt.compare(password, user.password);
        if(!matchUser){
          return  res.status(401).json({msg: "Unauthorized"});
        }
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: "30d"});
        console.log(token)
        res.status(200).json({msg: "Success in logging in", ok: true ,user, token})

    }catch(error){
        res.status(500).json({msg: error.message})
    }
};

export const register = async (req,res) =>{
    try{
        const {email,name,password} = req.body;
        const existingUser = await User.findOne({email: email});
        if(existingUser){
           return res.status(404).json({msg: "User already registered"});
        }
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        const newUser = new User({email: email, name: name, password: hashedPassword});
        await newUser.save();

        res.status(201).json({msg: "Success in registering",ok: true, newUser})

    }catch(error){
        res.status(500).json({msg: error.message})
    }
};



