const express = require ("express")
const app= express()
const jwt= require("jsonwebtoken")



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Listening on port ${PORT}!!!!.`)); 