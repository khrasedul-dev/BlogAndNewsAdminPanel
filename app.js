const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const catRouter = require('./router/catRouter')
const postRouter = require('./router/postRouter')
const userRouter = require('./router/userRouter')
const upload = require('./middlewere/upload')
// const jwt = require('jsonwebtoken')

const app = express()

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Database Connected"))
  .catch(err => console.error(err))

app.use(cors())

app.use(express.json({
    type:['application/json','text/plain']
}))

app.use(express.static('public'))
app.use(express.static('www'))

app.use(express.urlencoded({extended:true}))

app.use("/api/v1/categories",catRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/post",postRouter)



app.get('*',(req,res)=>{
    res.status(404).json({"status":"Not found!"})
})
app.post('*',(req,res)=>{
  res.status(404).json({"status":"Not found!"})
})
app.put('*',(req,res)=>{
  res.status(404).json({"status":"Not found!"})
})
app.delete('*',(req,res)=>{
  res.status(404).json({"status":"Not found!"})
})





const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port ${port} `)
})
