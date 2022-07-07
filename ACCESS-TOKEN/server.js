
require('dotenv').config()
const express = require ("express")
const app= express()
const jwt= require("jsonwebtoken")


app.use(express.json())
const posts=[  
    { 

    username:'Nova',
    title:'post 1'
},
{

    username:'john',
    title:'post 2'
},
{

    username:'Nova2',
    title:'post 3'
},


]

app.get('/posts',AuthenticateToken,(req,res)=>{
    res.json(posts.filter(post=>post.username===req.user.name))
})
 
 app.post('/login',(req,res)=>{ 
   //Authenticate User 
//    res.send('hai')  
    const username = req.body.username
    const user= {name:username}
    const accessToken= jwt .sign(user,process.env.ACCESS_TOKEN_SECRET)
     res.json({accessToken:accessToken})
 }) 
function AuthenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
   if (token==null)return res.sendStatus(401)

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err)return res.sendStatus(403).json('something rong')
    req.user=user
    next()
   })
}



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Listening on port ${PORT}!!!!.`)); 