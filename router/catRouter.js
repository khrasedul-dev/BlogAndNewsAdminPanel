const express = require('express')
const mongoose = require('mongoose')
const checkUser = require('../middlewere/checkUser')
const categoryModel = require('../model/categoryModel')

const catRouter = express.Router()

let isLoggedIn = true

catRouter.post("/", async (req, res) => {
    const {name} = req.body

    if (isLoggedIn) {
        try {
            const check_cat = await categoryModel.find({name: name})
            if (check_cat.length>0) {
                res.status(422).json({"status":"Categories already exists"})
            }else{
                const data = new categoryModel({
                    name : name
                })
                await data.save()
                res.status(201).json({"status":"Category Insert Successfully"})
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({"status": "Something is wrong"})
        }
    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }

})

catRouter.get('/total/count',(req,res)=>{
    if (isLoggedIn) {
        categoryModel.find()
        .then((data)=>{
            res.status(200).json({"totalCat":data.length})
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({"status":"Something is wrong"})
        })
    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }
})

catRouter.get('/single/:id',(req,res)=>{
    if (isLoggedIn) {
        const id = req.params.id
        categoryModel.find({_id : id})
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

catRouter.get('/allCat',async (req,res)=>{
    if (isLoggedIn) {
        try {
            const data = await categoryModel.find()
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({"status": "Something is wrong"})
        }
    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }
})

catRouter.get('/:pagenumber',async(req,res)=>{
    const page = req.params.pagenumber || 0
    const limit = 10

    if (isLoggedIn) {
        try {
            const data = await categoryModel.find().limit(limit).skip(limit * page)
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({"status": "Something is wrong"})
        }
    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }
})

catRouter.put('/',(req,res)=>{
    if (isLoggedIn) {
        const {id , name} = req.body
        categoryModel.findOneAndUpdate({_id : id},{name: name})
        .then(()=>{
            res.status(200).json({"status":"Data updated successfully"})
        })
        .catch((e)=>{
            res.status(500).json({"status":"Something is wrong"})
        })
    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }
})

catRouter.delete('/',async(req,res)=>{
    const {id} = req.body
    
    if (isLoggedIn) {
        try {
            await categoryModel.deleteOne({_id: id})
            res.status(200).json({"status":"Data successfully deleted"})
        } catch (error) {
            console.log(error)
            res.status(500).json({"status":"Something is wrong"})
        }
    } else {
        res.status(401).json({"status":"Unauthorized user"})
    }
})

module.exports = catRouter




