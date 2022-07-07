 
require('dotenv').config()

const express = require ("express")
const app= express()
const jwt= require("jsonwebtoken") 
let refreshTokens=[]

app.use(express.json())
app.post('/token',(req,res)=>{
    const refreshToken= req.body.token
    if(refreshToken==null)return res.sendStatus(401)
    if(!refreshTokens. includes(refreshToken))return res.sendStatus(403)
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRAT,(err,user)=>{
        if(err) return res.sendStatus(403) 
        const accessToken = generateAccessToken({name:user.name})
        res .json({accessToken:accessToken})
    }) 
})

app.post('/login',(req,res)=>{ 
    //Authenticate User 
 
     const username = req.body.username
     const user= {name:username}

     const accessToken=  generateAccessToken(user)
     const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRAT)
     refreshTokens.push(refreshToken)
      res.json({accessToken:accessToken,refreshToken:refreshToken})
  })


function generateAccessToken(user){
 return  jwt .sign(user,process.env.ACCESS_TOKEN_SECRET,{ expiresIn:'10m'})
}


const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Listening on port ${PORT}!!!!.`)); 