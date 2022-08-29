const express = require('express')
const userRouter = express.Router()

userRouter.get('/', (req, res)=>{
    try{
        const name = req.query.name
        const surname = req.query.surname
        const age = req.query.age
        age < 18 ? res.send('age is lower than 18') : res.send(`Hello, ${name} ${surname}`)
    }
    catch(err){
        res.send(`Error! ${err}`)
    }
    
})

module.exports = userRouter