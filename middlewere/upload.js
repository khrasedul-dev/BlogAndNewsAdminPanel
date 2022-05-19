const express = require('express')
const multer = require('multer')


const upload = multer({
    storage: multer.diskStorage({
        destination: (req , file , callback)=>{
            callback(null , "public/uploads")
        },
        filename: (req , file , callback)=>{
            callback( null , file.fieldname + '_' + Date.now() + file.originalname)
        }
    })
})


module.exports = upload
