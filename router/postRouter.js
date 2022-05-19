const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const postmodel = require('../model/postmodel')
const checkUser = require('../middlewere/checkUser')

const postRouter = express.Router()

let isLoggedIn = true

postRouter.post('/',(req,res)=>{
    const {title, content , category} = req.body

    if (isLoggedIn) {
        const data = new postmodel({
            title,content,category
        })
        data.save()
        .then(()=>{
            res.status(201).json({"status":"Post created successfully"})
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({"status":"Something is wrong"})
        })
    
    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }
})

postRouter.get('/recentPost',(req,res)=>{
    if (isLoggedIn) {
        const limit = 5
        postmodel.find().limit(limit).populate('category')
        .then((data)=>{
            if (data.length >0) {
                res.status(200).json(data)
            } else {
                res.status(400).json({"status":"No post found!"})
            }
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({"status":"Something is wrong"}) 
        })

    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }
})

postRouter.get('/allpost',(req,res)=>{

    if (isLoggedIn) {
        const limit = 10
        postmodel.find().populate('category')
        .then((data)=>{
            if (data.length >0) {
                res.status(200).json(data)
            } else {
                res.status(400).json({"status":"No post found!"})
            }
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({"status":"Something is wrong"}) 
        })

    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }
})


postRouter.get('/single/:id',(req,res)=>{

    if (isLoggedIn) {
        const id = req.params.id
        postmodel.find({_id : id}).populate('category')
        .then((data)=>{
            if (data.length >0) {
                res.status(200).json(data)
            } else {
                res.status(400).json({"status":"No post found!"})
            }
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({"status":"Something is wrong"}) 
        })
    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }
})

postRouter.get('/total/count',(req,res)=>{
    if (isLoggedIn) {
        postmodel.find()
        .then((data)=>{
            res.status(200).json({"totalPost":data.length})
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({"status":"Something is wrong"})
        })
    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }
})


postRouter.put('/',(req,res)=>{
    if (isLoggedIn) {
        const {id , title , content , category } = req.body
        const update_data = {
            title,content,category
        }
        postmodel.findOneAndUpdate({_id : id},update_data)
        .then((data)=>{
            res.status(200).json({"status":"Post updated successfully"})
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({"status":"Something is wrong"}) 
        })
    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }
})

postRouter.delete('/',async(req,res)=>{

    if (isLoggedIn) {
        const {id} = req.body

        try {
            await postmodel.deleteOne({_id: id})
            res.status(200).json({"status":"Data successfully deleted"})
        } catch (error) {
            console.log(error)
            res.status(500).json({"status":"Something is wrong"})
        }
    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }
    
})

module.exports = postRouter