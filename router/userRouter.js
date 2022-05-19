const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const checkUser = require('../middlewere/checkUser')

const userRouter = express.Router()

let isLoggedIn = true

userRouter.post('/signup',async (req,res)=>{
    const {name,username,password} = req.body

    if (isLoggedIn) {
        try {
            const hashpass = await bcrypt.hash(password , 10 )
    
            userModel.find({username: username})
            .then((data)=>{
                if (data.length > 0) {
                    res.status(422).json({"status":"Username already exists"})
                } else {
                    const user_data = new userModel({name,username,password: hashpass})
                    user_data.save()
                    .then(()=>{
                        res.status(201).json({"status":"User Successfully created"})
                    })
                    .catch((e)=>{
                        console.log(e)
                        res.status(500).json({"status":"Something is wrong"})
                    })
                }
            })
            .catch((e)=>{
                console.log(e)
                res.status(500).json({"status":"Something is wrong"})
            })
    
        } catch (error) {
            console.log(e)
            res.status(500).json({"status":"Something is wrong"})
        }
    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }
    
    
})

userRouter.post('/login',async (req,res)=>{
    const {username, password} = req.body

    try{
        const user = await userModel.find({username})
        if (user && user.length > 0) {
            
            const passisvalid = await bcrypt.compare(password , user[0].password )

            if (passisvalid) {

                const jwt_token = await jwt.sign({id: user[0]._id,username: user[0].username},process.env.JWT_SECRET)
                res.cookie('auth-token',jwt_token )
                res.status(200).json({"access_token": jwt_token})


            } else {    
                res.status(401).json({"status":"Auth failed!"})
            }
            

        } else {
            res.status(401).json({"status":"Auth failed!"})
        }

    }catch(e){
        console.log(e)
        res.status(500).json({"status":"Something is wrong"})
    }

})

module.exports = userRouter