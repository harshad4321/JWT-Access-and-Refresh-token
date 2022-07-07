
require('dotenv').config()
const express = require ("express")
const app= express()
const jwt= require("jsonwebtoken")
const { restart } = require("nodemon")

app.use(express.json())
const posts=[ 
    { 

    username:'Novabella',
    title:'post 1'
},
{

    username:'john',
    title:'post 2'
},
{

    username:'Nova',
    title:'post 3'
},


]

app.get('/posts',(req,res)=>{
    res.json(posts)
})

 app.post('/login',(req,res)=>{
   //Authenticate User
//    res.send('hai')
    const username = req.body.username
    const user= {name:username}
    const accessToken= jwt .sign(user,process.env.ACCESS_TOKEN_SECRET)
     res.json({accessToken:accessToken})
 }) 




const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Listening on port ${PORT}!!!!.`)); 