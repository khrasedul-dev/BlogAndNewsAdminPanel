const express = require('express')
const jwt = require('jsonwebtoken')

const checkUser = async(req,res,next)=>{
    const user_c = req.headers.cookie || "a=b"
    const fc = user_c.split('=')

    console.log(req.headers)
    
    try {
      const result = await jwt.verify(fc[1],process.env.JWT_SECRET)
      req.isLoggedIn = true
      next()

    } catch (error) {
        req.isLoggedIn = false
        next()
    }
}

module.exports = checkUser