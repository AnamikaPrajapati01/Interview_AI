import userModel from "../models/user.model";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { use } from "react";



async function registerUserController(req, res) {
    const {username, email, password} = req.body

    if (!username || !email || !password){
        return res.status(400).json({
            message:"please provide username, email and password"
        })
    }

    const isUserAlreadyExsits = await userModel.findOne({
        $or:[{username}, {email}]
    })
    if(isUserAlreadyExsits){
        return res.status(400).json({
            message:"account already exsits with this email address or password"       
        })
    }
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })
    const token = jwt.sign(
        {id:user._id, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token", token)
    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

async function loginUserController(req, res){
    const {email, password} = req.body  
    const user = await userModel.findOne({email})

    if (!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })

    }
        const token = jwt.sign(
        {id:user._id, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token", token)
    res.status(200).json({
        message:"user loggedIn successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}


export { registerUserController, loginUserController };