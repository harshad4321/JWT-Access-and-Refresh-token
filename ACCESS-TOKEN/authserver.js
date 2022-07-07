 
require('dotenv').config()

const express = require ("express")
const app= express()
const jwt= require("jsonwebtoken")


app.use(express.json())


 
app.post('/login',(req,res)=>{ 
    //Authenticate User 
 
     const username = req.body.username
     const user= {name:username}

     const accessToken=  generateAccessToken(user)
     const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRAT)
      res.json({accessToken:accessToken,refreshToken:refreshToken})
  })


function generateAccessToken(user){
 return  jwt .sign(user,process.env.ACCESS_TOKEN_SECRET,{ expiresIn:'15s'})
}


const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Listening on port ${PORT}!!!!.`)); 