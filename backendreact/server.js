const express=require('express')
const db=require('./database/db')
const bodyparser=require('body-parser')
const cors=require('cors')
const app=express()
const routess=require('./router')
app.use(bodyparser.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("welcome to react serve")
})

app.use("/",routess)
app.listen(5000,()=>{
    console.log("server is running on a port 5000");
})